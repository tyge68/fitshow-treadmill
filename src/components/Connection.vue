<template>
  <div id="connection" class="jumbotron">
    <h1 class="display-4">FitShow Treadmill F31</h1>
    <p class="lead">This is a simple application to control your treadmill F31, and run with your favorite training programs.</p>
    <hr class="my-4">
    <p>It uses Bluetooth Low Energy to access your device.</p>
    <p class="lead">
      <button @click="btConnect" id="connect" type="button" class="btn btn-primary active">Connect</button>
    </p>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
import { BTService } from '../services/bt_device';

EventBus.$once('btConnected', () => {
  window.jQuery('#connection').toggleClass('d-none');
});

export default {
  name: 'Connection',
  methods: {
    btConnect() {
      BTService.initBTConnection();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
