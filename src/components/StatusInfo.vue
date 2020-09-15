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
      <td id="speed"></td>
      <td id="incline"></td>
      <td id="avgSpeed"></td>
      <td id="totalDistance"></td>
      <td id="totalTime"></td>
      <td id="totalCalories"></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'StatusInfo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
