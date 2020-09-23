<template>
  <div class="no-overflow" :class="$store.state.running ? '' : 'md-hide'">
    <div>
      <md-progress-bar class="progress-green" md-mode="determinate" :md-value="program.percent"></md-progress-bar>
      <div class="progress-text">{{ program.remaining }}</div>
    </div>
    <div>
      <md-progress-bar class="progress-orange" md-mode="determinate" :md-value="step.percent"></md-progress-bar>
      <div class="progress-text">{{ step.remaining }}</div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  name: 'ProgressionInfo',
  data() {
    return {
      program: {
        percent: 0,
        remaining: ''
      },
      step: {
        percent: 0,
        remaining: ''
      }
    }
  },
  created() {
    let thisObj = this;
    EventBus.$on('trainingProgression', (data) => {
      thisObj.program = data.program;
      thisObj.step = data.step;
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

.no-overflow {
  overflow: hidden;
}

.md-progress-bar {
  margin: 0px;
  height: 15px;
}
.progress-orange {
  background-color: md-get-palette-color(orange, A100) !important;
}
.progress-orange .md-progress-bar-fill {
  background-color: md-get-palette-color(orange, A400) !important;
}
.progress-green {
  background-color: md-get-palette-color(green, A100) !important;
}
.progress-green .md-progress-bar-fill {
  background-color: md-get-palette-color(green, A400) !important;
}
.progress-text {
  position:relative;
  top: -11px;
  text-align: center;
  left: 0;
  line-height: 5px;
}
</style>
