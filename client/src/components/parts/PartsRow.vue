<template>
  <tr>
    <td><input type="checkbox" id="scales" name="scales"></td>
    <td>{{part.name}}</td>
    <td>{{part.price}}</td>
    <td>{{part.manufacturer}}</td>
    <td>{{part.model}}</td>
    <td>{{part.year}}</td>
    <td>{{part.color}}</td>
    <td>
      <button>Edit</button>
      <button @click="handlePartsDelete">Delete</button>
    </td>
  </tr>
</template>

<script>
  import {GET_PARTS, REMOVE_PART} from "../../utils/querys";

  export default {
    name: 'PartsRow',
    props: {
      part: {
        type: Object,
        required: true,
      }
    },
    methods: {
      deletePart: function () {
        this.$emit('deletePart', this.part);
      },
      handlePartsDelete: function () {
        this.$apollo.mutate({
          mutation: REMOVE_PART,
          variables: {
            id: this.part.id,
          },
          update: (store) => {
            const data = store.readQuery({
              query: GET_PARTS
            });
            data.parts = data.parts.filter(t => {
              return t.id !== this.part.id;
            });
            store.writeQuery({
              query: GET_PARTS,
              data
            });
          }
        });
      },
    },
    mounted() {
    }
  }
</script>

