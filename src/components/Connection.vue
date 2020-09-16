<template>
  <div class="jumbotron" :class="connected ? 'd-none' : ''">
    <h1 class="display-4">Sportstech Treadmill F31</h1>
    <p class="lead">This is a simple application to control your treadmill F31, and run with your favorite training programs.</p>
    <img class="img-fluid img-thumbnail" width="40%" height="auto" src="../assets/f31.jpg" />
    <hr class="my-4">
    <p>It uses Bluetooth Low Energy to access your device.</p>
    <p class="lead">
      <button @click="btConnect" type="button" class="btn btn-primary active">Connect</button>
    </p>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
import { BTService } from '../services/BTService';

export default {
  name: 'Connection',
  data() {
    return {
      connected: false
    }
  },
  methods: {
    btConnect() {
      BTService.initBTConnection();
    }
  },
  created() {
    let thisObj = this;
    EventBus.$once('btConnected', () => {
      thisObj.connected = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
