<template>
  <div class="container">
    <div class="progress my-3" data-toggle="tooltip" data-placement="top" title="Total Remaining Time">
      <div id="programProgress" class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress my-3" data-toggle="tooltip" data-placement="bottom" title="Step Remaining Time">
      <div id="stepProgress" class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
const $ = window.jQuery;
EventBus.$on('trainingProgression', (data) => {
  $('#programProgress')
      .css('width', data.program.percent+'%')
      .attr('aria-valuenow', data.program.percent)
      .html(data.program.remaining);
  $('#stepProgress')
      .css('width', data.step.percent+'%')
      .attr('aria-valuenow', data.step.percent)
      .html(data.step.remaining);
});

export default {
  name: 'ProgressionInfo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
