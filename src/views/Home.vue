<template>
  <div class="container-fluid">
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
      <div class="col px-0">
        <CommandPanel title="Incline Level" iconName="fa-mountain" commandType="incline" />
      </div>
    </div>
    <div class="row">
      <div class="col px-0">
        <CommandPanel title="Speed Level" iconName="fa-tachometer-alt" commandType="speed" />
      </div>
    </div>
    <SettingsDialog />
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import StatusInfo from '../components/StatusInfo.vue'
import ProgressionInfo from '../components/ProgressionInfo.vue'
import CommandPanel from '../components/CommandPanel.vue'
import Chart from '../components/Chart.vue'
import SettingsDialog from '../components/SettingsDialog.vue'
import { BTService } from '../services/BTService';

export default {
  name: 'Home',
  components: {
      TopNav,
      StatusInfo,
      ProgressionInfo,
      CommandPanel,
      Chart,
      SettingsDialog
  },
  created() {
    if (!BTService.isConnected()) {
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
