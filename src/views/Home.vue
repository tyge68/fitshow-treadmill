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
        <div :class='showChartPanel'>
          <Chart />
        </div>
        <div :class='showStatusPanel'>
          <StatusInfo />
        </div>
      </div>
    </div>
    <div class="row" :class="$store.state.started ? '':'d-none'">
      <div class="col px-0">
        <CommandPanel title="Incline Level" iconName="fa-mountain" commandType="incline" />
      </div>
    </div>
    <div class="row" :class="$store.state.started ? '':'d-none'">
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
  computed: {
      showChartPanel() {
        let toggleCountMod = this.$store.state.toggleCount % 2;
        return toggleCountMod === 0 ? 'd-none':'';
      },
      showStatusPanel() {
        let toggleCountMod = this.$store.state.toggleCount % 2;
        return toggleCountMod === 1 ? 'd-none':''
      }
  },
  created() {
    if (!this.$store.state.connected) {
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
