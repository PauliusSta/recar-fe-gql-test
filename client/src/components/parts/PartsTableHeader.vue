<template>
  <tr>
    <th
        v-for="(column, index ) in tableColumn"
        :key="column.title"
        :width="column.width"
    >
      <div class="table-title" @click="setHeaderValue(column.sortValue)">
        <span>{{ column.title }}</span>
        <span
            class="sort-icon"
            v-if="column.sortValue !== null"
            :class="[ column.sortValue === sortBy.field ? 'sort-'+ sortBy.direction: null ]"
        ></span>
      </div>
      <div v-if="column.filter && filterData[index]">
        <select v-model="filter[index]" @change="handleFilter">
          <option value=""></option>
          <option v-for="value in filterData[index]" :key="value" :value="value">{{value}}</option>
        </select>
      </div>
    </th>
  </tr>
</template>

<script>
  import {tableColumn} from '../../utils/constant.js';

  export default {
    name: 'PartsRow',
    props: {
      filterData: {
        type: Object,
        required: false,
      }
    },
    data() {
      return {
        showEditModal: false,
        sortBy: {
          direction: 'ASC',
          field: 'ID',
        },
        filter: {},
        tableColumn: tableColumn,
      }
    },
    methods: {
      handleFilter() {
        const filterData = {...this.filter}
        Object.keys(filterData).forEach((key) => {
          if (filterData[key] === null || filterData[key] === '') {
            delete filterData[key];
          }
        });
        this.$emit('setFilter', filterData);
      },
      setHeaderValue(key) {
        if (key === null) {
          return;
        }

        if (this.sortBy.field !== key) {
          this.sortBy.direction = "ASC";
        } else {
          this.sortBy.direction = this.sortBy.direction === "ASC" ? "DESC" : 'ASC'
        }
        this.sortBy.field = key;
        this.$emit('setSortBy', this.sortBy);
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  .table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .sort-icon {
      content: '';
      display: block;
      width: 13px;
      height: 19px;
      background-image: url("../../assets/images/notselected.png");

      &.sort-DESC {
        background-image: url("../../assets/images/down.png");
      }

      &.sort-ASC {
        background-image: url("../../assets/images/up.png");
      }
    }
  }

  .table-title {
    cursor: pointer;
  }
</style>