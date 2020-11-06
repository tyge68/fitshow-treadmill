<template>
  <md-app>
    <md-app-content>
      <h1>Sportstech Treadmill F31 <a :href="gitUrl" target="_blank">v{{ version }}</a></h1>
      <p>This is a simple application to control your treadmill F31, and run with your favorite training programs.</p>
      <img width="40%" height="auto" src="../assets/f31.jpg" />
      <hr>
      <p>It uses Bluetooth Low Energy to access your device.</p>
      <md-button @click="btConnect" class="md-primary">Connect</md-button>
    </md-app-content>
  </md-app>
</template>

<script>
import { EventBus } from '../event-bus';
import { BTService } from '../services/BTService';

export default {
  name: 'Connection',
  methods: {
    btConnect() {
      BTService.initBTConnection();
    }
  },
  data() {
    return {
      version: process.env.GIT_HASH,
      gitUrl: "https://github.com/tyge68/fitshow-treadmill/commit/" + process.env.GIT_HASH
    }
  },
  created() {
    let thisObj = this;
    EventBus.$once('btConnected', () => {
      thisObj.$router.push({ path: '/home' });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
