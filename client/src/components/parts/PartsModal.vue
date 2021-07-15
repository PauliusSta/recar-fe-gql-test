<template>
  <div id="open-modal" class="modal-window">
    <div class="modal-close-background" @click="handelCloseModal"></div>
    <div class="modal-content">
      <a href="#" title="Close" class="modal-close" @click="handelCloseModal">Close</a>
      <h1>{{ title }}</h1>
      <div class="form-block">
        <label for="price">Name:</label>
        <input type="text" id="name" name="name" v-model="formData.name">
      </div>
      <div class="form-block">
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" v-model="formData.price">
      </div>
      <div class="form-block">
        <label for="manufacturer">Manufacturer:</label>
        <input type="text" id="manufacturer" name="manufacturer" v-model="formData.manufacturer">
      </div>
      <div class="form-block">
        <label for="model">Model:</label>
        <input type="text" id="model" name="model" v-model="formData.model">
      </div>
      <div class="form-block">
        <label for="year">Year:</label>
        <input type="number" id="year" name="year" v-model="formData.year">
      </div>
      <div class="form-block">
        <label for="Color">Color:</label>
        <input type="text" id="color" name="color" v-model="formData.color">
      </div>
      <div>
        <button @click="handelSave">Save</button>
        <button @click="handelCloseModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'PartsModal',
    props: {
      title: {
        type: String,
        required: true,
      },
      part: {
        type: Object,
        required: false,
      }
    },
    data() {
      return {
        formData: {
          name: null,
          price: null,
          manufacturer: null,
          model: null,
          year: null,
          color: null,
        }
      }
    },
    methods: {
      handelCloseModal() {
        this.$emit('close');
      },
      handelSave() {
        this.formData = {
          ...this.formData,
          price: parseInt(this.formData.price, 10),
          year: parseInt(this.formData.year, 10),
        }
        this.$emit('save', this.formData);
        this.$emit('close');
      }
    },
    mounted() {
      if (this.part) {
        this.formData = {
          name: this.part.name,
          price: this.part.price,
          manufacturer: this.part.manufacturer,
          model: this.part.model,
          year: this.part.year,
          color: this.part.color,
        };
      }
    }
  }
</script>


<style lang="scss">
  .modal-window {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    transition: all 0.3s;

    & > .modal-content {
      width: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2em;
      background: white;
    }

    header {
      font-weight: bold;
    }

    h1 {
      font-size: 150%;
      margin: 0 0 15px;
    }
  }

  .modal-close-background {
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

  }

  .modal-close {
    color: #aaa;
    line-height: 50px;
    font-size: 80%;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 70px;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=text], input[type=number] {
    width: 100%;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    padding: 5px 10px;
    display: block;
  }

  .form-block {
    padding-bottom: 10px;

    label {
      margin-bottom: 5px;
      display: block;
    }
  }

  .modal-window button {
    margin: 5px 5px 5px 0;
  }
</style>
