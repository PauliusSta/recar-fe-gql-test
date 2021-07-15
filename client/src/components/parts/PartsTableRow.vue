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
        this.$emit('handleEditSubmit', {part, id: this.part.id});
      },
      handlePartsDelete() {
        this.$emit('handlePartsDelete', this.part.id);
      },
    },
    mounted() {
    }
  }
</script>

