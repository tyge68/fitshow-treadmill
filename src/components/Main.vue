<template>
  <div id="main" class="container d-none">
    <div class="row">
      <div class="col">
          <TopNav />
      </div>
    </div>
    <div class="row">
      <div class="col " id="connectedPanel">
        <StatusInfo />
        <ProgressionInfo/>
        <CommandPanel />
      </div>
    </div>
    <div class="row">
      <div class="col collapse" id="chartPanel">
            <Chart />
      </div>
    </div>
    <SettingsDialog />
  </div>
</template>

<script>
import TopNav from './TopNav.vue'
import StatusInfo from './StatusInfo.vue'
import ProgressionInfo from './ProgressionInfo.vue'
import CommandPanel from './CommandPanel.vue'
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
      CommandPanel,
      Chart,
      SettingsDialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
