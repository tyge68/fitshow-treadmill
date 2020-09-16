<template>
  <table class="table">
    <tr>
      <td><i class="fas fa-tachometer-alt" data-toggle="tooltip" title="Current Speed (km/h)" /></td>
      <td><i class="fas fa-mountain" data-toggle="tooltip" title="Current Incline (%)"/></td>
      <td>&#9651;<i class="fas fa-tachometer-alt" data-toggle="tooltip" title="Average Speed (km/h)"/></td>
      <td><i class="fas fa-road" data-toggle="tooltip" title="Total distance (meters)"/></td>
      <td><i class="fas fa-hourglass-half" data-toggle="tooltip" title="Total time"/></td>
      <td><i class="fas fa-fire-alt" data-toggle="tooltip" title="Total calories burned"/></td>
    </tr>
    <tr>
      <td id="speed">{{ speed }}</td>
      <td id="incline">{{ incline }}</td>
      <td id="avgSpeed">{{ avgSpeed }}</td>
      <td id="totalDistance">{{ totalDistance }}</td>
      <td id="totalTime">{{ totalTime }}</td>
      <td id="totalCalories">{{ totalCalories }}</td>
    </tr>
  </table>
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
