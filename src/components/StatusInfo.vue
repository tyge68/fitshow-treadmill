<template>
<div>
  <div class="md-layout">
      <div class="md-layout-item"><i class="fas fa-tachometer-alt" data-toggle="tooltip" title="Current Speed (km/h)" /></div>
      <div class="md-layout-item"><i class="fas fa-mountain" data-toggle="tooltip" title="Current Incline (%)"/></div>
      <div class="md-layout-item">&#9651;<i class="fas fa-tachometer-alt" data-toggle="tooltip" title="Average Speed (km/h)"/></div>
      <div class="md-layout-item"><i class="fas fa-road" data-toggle="tooltip" title="Total distance (meters)"/></div>
      <div class="md-layout-item"><i class="fas fa-hourglass-half" data-toggle="tooltip" title="Total time"/></div>
      <div class="md-layout-item"><i class="fas fa-fire-alt" data-toggle="tooltip" title="Total calories burned"/></div>
  </div>
  <div class="md-layout">
      <div class="md-layout-item">{{ speed }}</div>
      <div class="md-layout-item">{{ incline }}</div>
      <div class="md-layout-item">{{ avgSpeed }}</div>
      <div class="md-layout-item">{{ totalDistance }}</div>
      <div class="md-layout-item">{{ totalTime }}</div>
      <div class="md-layout-item">{{ totalCalories }}</div>
  </div>
</div> 
</template>

<script>
import { EventBus } from '../event-bus';
import moment from 'moment';

export default {
  name: 'StatusInfo',
  data() {
    return {
      speed: 0,
      incline: 0,
      avgSpeed: 0,
      totalDistance: 'N/A',
      totalTime: 'N/A',
      totalCalories: 'N/A'
    }
  },
  created() {
    let thisObj = this;
    EventBus.$on('btRunning', (states) => {
      let value = states.value;
      let totalDistance = value.getUint8(7) + value.getUint8(8) * 256;
      let totalTime = value.getUint8(5) + value.getUint8(6) * 256;
      thisObj.speed = states.currentSpeed;
      thisObj.incline = states.currentIncline;
      thisObj.avgSpeed = window.math.round(totalDistance / totalTime * 3.6, 1);
      thisObj.totalTime = moment.duration(totalTime, 'seconds').format('H:mm:ss');
      thisObj.totalDistance = totalDistance;
      thisObj.totalCalories= (value.getUint8(9) + value.getUint8(10) * 256) / 10;
    });
    EventBus.$on('btStopped',() => {
      thisObj.speed = 0;
      thisObj.incline = 0;
      thisObj.avgSpeed = 0;
      thisObj.totalTime = 'N/A';
      thisObj.totalDistance = 'N/A';
      thisObj.totalCalories= 'N/A';
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
