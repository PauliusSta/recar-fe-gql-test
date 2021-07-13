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
      <tr>
        <th></th>
        <th>Name</th>
        <th>Price</th>
        <th>Manufacturer</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Events</th>
      </tr>
      <v-parts-row
          v-for="part in parts"
          :key="part.id"
          :part="part"
      ></v-parts-row>

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
  import VPartsRow from './PartsRow.vue'
  import VPartsModal from './PartsModal.vue'

  import {GET_PARTS, ADD_PART} from '../../utils/querys'

  export default {
    name: 'Parts',
    components: {
      VPartsRow,
      VPartsModal,
    },
    apollo: {
      // Simple query that will update the 'hello' vue property
      parts: {
        query: GET_PARTS,
        error(error) {
          this.error = JSON.stringify(error.message);
        }
      },
    },
    data() {
      return {
        error: null,
        showEditModal: true,
      }
    },
    methods: {
      handleShowAddModal: function () {
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

      &:first-child {
        width: 22px;
      }

      &:first-child {
        width: 22px;
      }
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
      background-color: #04AA6D;
      color: white;
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
