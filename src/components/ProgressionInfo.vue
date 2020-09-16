<template>
  <div id="progressionPanel" :class="running ? '' : 'd-none'">
    <div class="progress my-3" data-toggle="tooltip" data-placement="top" title="Total Remaining Time">
      <div id="programProgress" class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="'width: '+program.percent+'%;'" :aria-valuenow="program.percent" aria-valuemin="0" aria-valuemax="100">{{ program.remaining }}</div>
    </div>
    <div class="progress my-3" data-toggle="tooltip" data-placement="bottom" title="Step Remaining Time">
      <div id="stepProgress" class="progress-bar progress-bar-striped bg-info" role="progressbar" :style="'width:'+step.percent+'%;'" :aria-valuenow="step.percent" aria-valuemin="0" aria-valuemax="100">{{ step.remaining }}</div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  name: 'ProgressionInfo',
  data() {
    return {
      running: false,
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

    EventBus.$on('btStopped', () => {
      thisObj.running = false;
    });

    EventBus.$on('trainingProgramStarted', () => {
      thisObj.running = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
