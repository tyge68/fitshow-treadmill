<template>
  <md-app>
    <md-app-toolbar>
          <TopNav />
    </md-app-toolbar>
    <md-app-content>
      <div class="md-layout">
        <div class="md-layout-item">
          <ProgressionInfo/>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item">
          <div :class='showChartPanel'>
            <Chart />
          </div>
          <div :class='showStatusPanel'>
            <StatusInfo />
          </div>
        </div>
      </div>
      <div class="md-layout" :class="$store.state.started && !$store.state.running ? '':'md-hide'">
        <div class="md-layout-item">
          <CommandPanel title="Incline Level" iconName="landscape" commandType="incline" />
        </div>
      </div>
      <div class="md-layout" :class="$store.state.started && !$store.state.running ? '':'md-hide'">
        <div class="md-layout-item">
          <CommandPanel title="Speed Level" iconName="speed" commandType="speed" />
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import StatusInfo from '../components/StatusInfo.vue'
import ProgressionInfo from '../components/ProgressionInfo.vue'
import CommandPanel from '../components/CommandPanel.vue'
import Chart from '../components/Chart.vue'

export default {
  name: 'Home',
  components: {
      TopNav,
      StatusInfo,
      ProgressionInfo,
      CommandPanel,
      Chart
  },
  computed: {
      showChartPanel() {
        let toggleCountMod = this.$store.state.toggleCount % 2;
        return toggleCountMod === 0 ? 'md-hide':'';
      },
      showStatusPanel() {
        let toggleCountMod = this.$store.state.toggleCount % 2;
        return toggleCountMod === 1 ? 'md-hide':''
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
