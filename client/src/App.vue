<template>
  <div id="app">
    <VParts></VParts>
  </div>
</template>

<script>

  import VParts from './components/parts/Parts.vue'

  export default {
    name: 'App',
    components: {
      VParts
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

  * {
    box-sizing: border-box;
  }
</style>
