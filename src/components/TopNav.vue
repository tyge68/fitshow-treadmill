<template>
    <div class="md-layout">
      <div class="md-layout-item" :class="$store.state.started ? 'md-hide':''">
        <md-button @click="showDialog" class="md-primary"><i class="fas fa-cogs"></i></md-button>
        <md-menu md-size="small">
          <md-button md-menu-trigger>Small</md-button>

          <md-menu-content>
            <md-menu-item><a class="dropdown-item" href="#/programEditor">Program Editor</a></md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
      <md-button class="md-primary" @click="startTreadmill" :disabled="$store.state.started"><i class="fas fa-play-circle"></i></md-button>
      <md-button class="md-primary" @click="stopTreadmill" :disabled="!$store.state.started"><i class="far fa-stop-circle"></i></md-button>
      <md-button class="md-primary" @click="startProgram" :class="$store.state.started ? '':'md-hide'" :disabled="$store.state.running"><i class="fas fa-running"></i></md-button>
      <md-button class="md-primary" @click="togglePanels"><i class="fas fa-info-circle"></i> / <i class="fas fa-chart-bar"></i></md-button>  
      <md-button class="md-primary" @click="enterFullscreen" :class="fullscreen ? 'md-hide':''"><i class="fas fa-expand-arrows-alt"></i></md-button>
      <md-button class="md-primary" @click="exitFullscreen" :class="fullscreen ? '':'md-hide'"><i class="fas fa-compress"></i></md-button>
      <SettingsDialog />
    </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor'
import SettingsDialog from './SettingsDialog.vue'
import { BTService, START_COMMAND, STOP_COMMAND } from '../services/BTService'
import { EventBus } from '../event-bus'

export default {
  name: 'TopNav',
  data() {
    return {
      fullscreen: false
    }
  },
  components: {
      SettingsDialog
  },
  methods: {
    showDialog() {
      EventBus.$emit('openDialog')
    },
    startTreadmill() {
      BTService.addMessage(START_COMMAND)
    },
    stopTreadmill() {
      BTService.addMessage(STOP_COMMAND)
    },
    startProgram() {
      if (!ProgramExecutor.isExecuting() && BTService.isRunning()) {
        ProgramExecutor.start()
        this.running = true  
      }
    },
    togglePanels() {
      this.$store.commit('togglePanels')
    },
    enterFullscreen() {
      document.getElementsByTagName("body")[0].requestFullscreen()
      this.fullscreen = true
    },
    exitFullscreen() {
      document.exitFullscreen()
      this.fullscreen = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
