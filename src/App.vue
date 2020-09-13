<template>
  <div id="app" class="container">
    <Connection />
    <Main />
  </div>
</template>

<script>
import Connection from './components/Connection.vue';
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    Connection,
    Main
  }
}
</script>

<style>
.btn:focus{
  box-shadow:none !important;
}
html {
  background-color: #ffffff;
}
</style>
