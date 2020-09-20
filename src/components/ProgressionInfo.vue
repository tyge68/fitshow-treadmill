<template>
  <div :class="$store.state.running ? '' : 'md-hide'">
    <md-progress-spinner class="md-primary" md-mode="determinate" :md-value="program.percent">{{ program.remaining }}</md-progress-spinner>
    <md-progress-spinner class="md-secondary" md-mode="determinate" :md-value="step.percent">{{ step.remaining }}</md-progress-spinner>
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
<style scoped>

</style>
