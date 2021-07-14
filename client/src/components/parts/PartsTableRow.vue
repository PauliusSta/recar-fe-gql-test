<template>
  <tr>
    <td>{{part.name}}</td>
    <td>{{part.price}}</td>
    <td>{{part.manufacturer}}</td>
    <td>{{part.model}}</td>
    <td>{{part.year}}</td>
    <td>{{part.color}}</td>
    <td>
      <button @click="handleShowAddModal">Edit</button>
      <button @click="handlePartsDelete">Delete</button>
      <v-parts-modal
          title="Edit"
          v-if="showEditModal"
          :part="part"
          @save="handleEditSubmit"
          @close="handleShowAddModal"
      ></v-parts-modal>
    </td>
  </tr>
</template>

<script>
  import {EDIT_PARTS, GET_PARTS, REMOVE_PART} from "../../utils/querys";
  import VPartsModal from "./PartsModal";

  export default {
    name: 'PartsTableRow',
    components: {
      VPartsModal,
    },
    props: {
      part: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        showEditModal: false,
      }
    },
    methods: {
      deletePart() {
        this.$emit('deletePart', this.part);
      },
      handleShowAddModal() {
        this.showEditModal = !this.showEditModal;
      },
      handleEditSubmit(part) {
        this.$apollo.mutate({
          mutation: EDIT_PARTS,
          variables: {
            id: this.part.id,
            input: part,
          },
          update: (cache) => {
            try {
              const data = cache.readQuery({
                query: GET_PARTS
              });

              cache.writeQuery({
                query: GET_PARTS,
                data
              });

            } catch (e) {
              console.error(e);
            }
          }
        });
      },
      handlePartsDelete() {
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

