<template>
  <div id="main" class="d-none">
    <div class="row">
      <div class="col">
          <TopNav />
      </div>
    </div>
    <div class="row">
      <div class="col " id="connectedPanel">
        <ProgressionInfo/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="collapse multi-collapse" id="chartPanel">
          <Chart />
        </div>
        <div class="collapse multi-collapse show" id="statusInfoPanel">
          <StatusInfo />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col px-0" id="inclinePanel">
        <CommandInclinePanel />
      </div>
    </div>
    <div class="row">
      <div class="col px-0" id="speedPanel">
        <CommandSpeedPanel />
      </div>
    </div>
    <SettingsDialog />
  </div>
</template>

<script>
import TopNav from './TopNav.vue'
import StatusInfo from './StatusInfo.vue'
import ProgressionInfo from './ProgressionInfo.vue'
import CommandInclinePanel from './CommandInclinePanel.vue'
import CommandSpeedPanel from './CommandSpeedPanel.vue'
import Chart from './Chart.vue'
import SettingsDialog from './SettingsDialog.vue'
import { EventBus } from '../event-bus'

EventBus.$once('btConnected', () => {
  window.jQuery('#main').toggleClass('d-none');
});

export default {
  name: 'Main',
  components: {
      TopNav,
      StatusInfo,
      ProgressionInfo,
      CommandInclinePanel,
      CommandSpeedPanel,
      Chart,
      SettingsDialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
