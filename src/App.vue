<template>
  <div id="app">
    <div class="container">
      <router-view/>
      <loader v-show="loading"></loader>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Loader from "./components/Loader";
  export default {
    components: {
      Loader
    },
    computed:{
      ...mapGetters([
        'loading'
      ]),
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 60px 0;
  }



</style>
