<template>
  <div id="app">
    <div class="header">
      <div>
        <button
            @click="handleShowAddModal">Add
        </button>
      </div>

    </div>
    <table style="width:100%" id="parts">
      <v-parts-table-header
          @setSortBy="setSortBy"
      >
      </v-parts-table-header>
      <v-parts-table-row
          v-for="part in parts"
          :key="part.id"
          :part="part"
      ></v-parts-table-row>

    </table>
    <div v-if="$apollo.queries.parts.loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <v-parts-modal
        title="Add"
        v-if="showEditModal"
        @save="handleAddSubmit"
        @close="handleShowAddModal"
    ></v-parts-modal>
  </div>
</template>

<script>
  import VPartsTableRow from './PartsTableRow.vue'
  import VPartsTableHeader from './PartsTableHeader.vue'
  import VPartsModal from './PartsModal.vue'

  import { GET_PARTS, ADD_PART } from '../../utils/querys'

  export default {
    name: 'PartsTableRow',
    components: {
      VPartsTableRow,
      VPartsTableHeader,
      VPartsModal,
    },
    apollo: {
      // Simple query that will update the 'hello' vue property
      parts: {
        query: GET_PARTS,
        variables() {
          return {
            filters: {},
            sortBy: {
              direction: this.sortBy.direction,
              field: this.sortBy.field,
            },
          }
        },
        error(error) {
          this.error = JSON.stringify(error.message);
        }
      },
    },
    data() {
      return {
        error: null,
        showEditModal: false,
        sortBy: {
          direction: 'ASC',
          field: 'ID',
        },
      }
    },
    methods: {
      setSortBy(sortBy) {
        this.sortBy = sortBy;
      },
      handleShowAddModal() {
        this.showEditModal = !this.showEditModal;
      },
      handleAddSubmit(part) {
        this.$apollo.mutate({
          mutation: ADD_PART,
          variables: {
            input: part,
          },
          update: (cache, {data: {createPart}}) => {
            try {
              const data = cache.readQuery({
                query: GET_PARTS
              });
              data.parts.splice(0, 0, createPart.part);
              cache.writeQuery({
                query: GET_PARTS,
                data
              });
            } catch (e) {
              console.error(e);
            }
          }
        });
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }

  #parts {
    td, th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #343a40;
      border-color: #454d55;
      color: white;
    }
    button {
      margin-right: 10px;
    }
  }
  button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 7px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #059862;
    }
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px;
    background-color: #f2f2f2;
  }
</style>
