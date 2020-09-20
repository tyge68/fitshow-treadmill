<template>
    <div class="container-fluid">
      <div class="btn-group" :class="$store.state.started ? 'd-none':''">
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editSettingsDialog"><i class="fas fa-cogs"></i></button>
        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#/programEditor">Program Editor</a>
        </div>
      </div>
      <div class="btn-group">
        <button @click="startTreadmill" type="button" class="btn btn-primary" :disabled="$store.state.started"><i class="fas fa-play-circle"></i></button>
        <button @click="stopTreadmill" type="button" class="btn btn-primary" :disabled="!$store.state.started"><i class="far fa-stop-circle"></i></button>
        <button @click="startProgram" type="button" class="btn btn-primary" :class="$store.state.started ? '':'d-none'" :disabled="$store.state.running"><i class="fas fa-running"></i></button>
        <button @click="togglePanels" type="button" class="btn btn-primary"><i class="fas fa-info-circle"></i> / <i class="fas fa-chart-bar"></i></button>  
        <button @click="enterFullscreen" type="button" class="btn btn-primary" :class="fullscreen ? 'd-none':''"><i class="fas fa-expand-arrows-alt"></i></button>
        <button @click="exitFullscreen" type="button" class="btn btn-primary" :class="fullscreen ? '':'d-none'"><i class="fas fa-compress"></i></button>
      </div>
    </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor';
import { BTService, START_COMMAND, STOP_COMMAND } from '../services/BTService';

export default {
  name: 'TopNav',
  data() {
    return {
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
    togglePanels() {
      this.$store.commit('togglePanels');
    },
    enterFullscreen() {
      document.getElementsByTagName("body")[0].requestFullscreen();
      this.fullscreen = true;
    },
    exitFullscreen() {
      document.exitFullscreen();
      this.fullscreen = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
