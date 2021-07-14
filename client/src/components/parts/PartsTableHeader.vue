<template>
  <tr>
    <th
        v-for="column in tableColumn"
        @click="setHeaderValue(column.sortValue)"
        :key="column.title"
    >
      <div class="table-title">
        <span>{{ column.title }}</span>
        <span
            class="sort-icon"
            v-if="column.sortValue !== null"
            :class="[ column.sortValue === sortBy.field ? 'sort-'+ sortBy.direction: null ]"
        ></span>
      </div>
    </th>
  </tr>
</template>

<script>
  import { tableColumn } from '../../utils/constant.js';

  export default {
    name: 'PartsRow',
    props: {},
    data() {
      return {
        showEditModal: false,
        sortBy: {
          direction: 'ASC',
          field: 'ID',
        },
        tableColumn: tableColumn,
      }
    },
    methods: {
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
</style>