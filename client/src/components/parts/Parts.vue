<template>
  <div id="app">
    <div class="header">
      <div>
        <button
            @click="handleShowAddModal">Add
        </button>
      </div>
      <div></div>
    </div>
    <table style="width:100%" id="parts">
      <v-parts-table-header
          @setSortBy="setSortBy"
          @setFilter="setFilter"
          :filterData="filterData"
      >
      </v-parts-table-header>
      <v-parts-table-row
          v-for="part in parts"
          :key="part.id"
          :part="part"
          @handleEditSubmit="handleEditSubmit"
          @handlePartsDelete="handlePartsDelete"
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
  import { tableColumn } from '../../utils/constant'
  import {GET_PARTS, ADD_PART, EDIT_PARTS, REMOVE_PART} from '../../utils/querys'

  export default {
    name: 'PartsTableRow',
    components: {
      VPartsTableRow,
      VPartsTableHeader,
      VPartsModal,
    },
    computed: {
      tableColumn() {
        return tableColumn
      },
      filterData: function () {
        const filterData = {};
        if (!this.parts) {
          return {};
        }
        this.parts.forEach((part) => {
          Object.keys(part).forEach((key) => {
            if (!this.tableColumn[key] || !this.tableColumn[key].filter) {
              return;
            }
            if (!filterData[key] ) {
              filterData[key] = [];
            }
            if (filterData[key].indexOf(part[key]) === -1) {
              filterData[key].push(part[key]);
            }
          });

        })

        Object.keys(filterData).forEach((key) => {
          filterData[key].sort();
        });

        return filterData;
      },
    },
    apollo: {
      parts: {
        query: GET_PARTS,
        variables() {
          return {
            filters: {...this.filters},
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
        filters: {},
      }
    },
    methods: {
      setSortBy(sortBy) {
        this.sortBy = sortBy;
      },
      setFilter(filter) {
        this.filters = filter;
      },
      handleShowAddModal() {
        this.showEditModal = !this.showEditModal;
      },
      async readQueryTarget(target) {
        return await target.readQuery({
          query: GET_PARTS,
          variables: {
            filters: {...this.filters},
            sortBy: {
              direction: this.sortBy.direction,
              field: this.sortBy.field,
            },
          }
        });
      },
      updateQueryTarget(target, data) {
        target.writeQuery({
          query: GET_PARTS,
          variables: {
            filters: {...this.filters},
            sortBy: {
              direction: this.sortBy.direction,
              field: this.sortBy.field,
            },
          },
          data
        });
      },
      handleAddSubmit(part) {
        this.$apollo.mutate({
          mutation: ADD_PART,
          variables: {
            input: part,
          },
          update: async (cache, {data: {createPart}}) => {
            try {
              const data = await this.readQueryTarget(cache);
              data.parts.splice(0, 0, createPart.part);
              this.updateQueryTarget(cache, data);
            } catch (e) {
              console.error(e);
            }
          }
        });
      },
      handleEditSubmit({part, id}) {
        this.$apollo.mutate({
          mutation: EDIT_PARTS,
          variables: {
            id: id,
            input: part,
          },
          update: async (cache) => {
            try {
              const data = await this.readQueryTarget(cache);
              this.updateQueryTarget(cache, data);
            } catch (e) {
              console.error(e);
            }
          }
        });
      },
      handlePartsDelete(id) {
        this.$apollo.mutate({
          mutation: REMOVE_PART,
          variables: {
            id: id,
          },
          update: (store) => {
            const data = store.readQuery({
              query: GET_PARTS,
              variables: {
                filters: {...this.filters},
                sortBy: {
                  direction: this.sortBy.direction,
                  field: this.sortBy.field,
                },
              }
            });
            data.parts = data.parts.filter(t => {
              return t.id !== id;
            });
            this.updateQueryTarget(store, data);
          }
        });
      },
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
      vertical-align: top;
    }

    td button {
      margin: 5px 5px 5px 0;
    }
  }
  select {
    width: 100%;
    display: block;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    padding: 3px 10px;
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
