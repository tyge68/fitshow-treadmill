<template>
    <div class="container-fluid btn-group" :class="connected ? '':'d-none'">
      <button type="button" class="btn btn-secondary" :class="started ? 'd-none':''" data-toggle="modal" data-target="#editSettingsDialog"><i class="fas fa-cogs"></i></button>
      <button @click="startTreadmill" type="button" class="btn btn-primary" :disabled="started"><i class="fas fa-play-circle"></i></button>
      <button @click="stopTreadmill" type="button" class="btn btn-primary" :disabled="!started"><i class="far fa-stop-circle"></i></button>
      <button @click="startProgram" type="button" class="btn btn-primary" :class="started ? '':'d-none'" :disabled="running"><i class="fas fa-running"></i></button>
      <button aria-expanded="false" aria-controls="statusInfoPanel chartPanel" type="button" data-toggle="collapse" data-target=".multi-collapse" class="btn btn-primary"><i class="fas fa-info-circle"></i> / <i class="fas fa-chart-bar"></i></button>  
      <button @click="enterFullscreen" type="button" class="btn btn-primary" :class="fullscreen ? 'd-none':''"><i class="fas fa-expand-arrows-alt"></i></button>
      <button @click="exitFullscreen" type="button" class="btn btn-primary" :class="fullscreen ? '':'d-none'"><i class="fas fa-compress"></i></button>
    </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor';
import { EventBus } from '../event-bus';
import { BTService, START_COMMAND, STOP_COMMAND } from '../services/BTService';

export default {
  name: 'TopNav',
  data() {
    return {
      started: false,
      running: false,
      connected: false,
      fullscreen: false
    };
  },
  methods: {
    startTreadmill() {
      BTService.addMessage(START_COMMAND);
    },
    stopTreadmill() {
      BTService.addMessage(STOP_COMMAND);
    },
    startProgram() {
      if (!ProgramExecutor.isExecuting() && BTService.isRunning()) {
        ProgramExecutor.start();
        this.running = true;  
      }
    },
    enterFullscreen() {
      document.getElementsByTagName("body")[0].requestFullscreen();
      this.fullscreen = true;
    },
    exitFullscreen() {
      document.exitFullscreen();
      this.fullscreen = false;
    }
  },
  created() {
    let thisObj = this;
    EventBus.$on('btRunning', () => {
      thisObj.started = true;
    });
    EventBus.$on('btStopped', () => {
      thisObj.running = false;
      thisObj.started = false;
    });
    EventBus.$on('btConnected', () => {
      thisObj.connected = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
