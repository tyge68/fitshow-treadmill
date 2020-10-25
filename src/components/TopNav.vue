<template>
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <div :class="$store.state.started ? 'md-hide':''">
          <md-menu md-size="small">
            <md-button md-menu-trigger class="md-icon-button md-secondary"><md-icon>menu</md-icon></md-button>
            <md-menu-content>
              <md-menu-item to="/programEditor">Program Editor</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-button @click="showDialog" class="md-icon-button md-primary"><md-icon>settings</md-icon></md-button>
          <SettingsDialog />
        </div>
        <md-button class="md-icon-button md-primary" @click="startTreadmill" :disabled="$store.state.started"><md-icon>play_arrow</md-icon></md-button>
        <md-button class="md-icon-button md-accent" @click="stopTreadmill" :disabled="!$store.state.started"><md-icon>stop</md-icon></md-button>
        <md-button class="md-icon-button md-primary" @click="startProgram" :class="$store.state.started ? '':'md-hide'" :disabled="$store.state.running"><md-icon>directions_run</md-icon></md-button>
        <md-button class="md-primary" :class="showInfoSwitch()" @click="togglePanels"><md-icon>info</md-icon> / <md-icon>bar_chart</md-icon></md-button>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button md-primary" @click="enterFullscreen" :class="fullscreen ? 'md-hide':''"><md-icon>fullscreen</md-icon></md-button>
        <md-button class="md-icon-button md-primary" @click="exitFullscreen" :class="fullscreen ? '':'md-hide'"><md-icon>fullscreen_exit</md-icon></md-button>
      </div>
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
  mounted() {
    window.addEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  methods: {
    handleOrientationChange() {
      this.$forceUpdate()
    },
    showInfoSwitch() {
      return window.screen.orientation.type === 'landscape-primary' ? '' : 'md-hide'
    },
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
