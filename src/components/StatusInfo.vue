<template>
  <table class="table">
    <tr>
      <td>Speed (km/h)</td>
      <td>Incline (%)</td>
      <td>Total Distance (meters)</td>
      <td>Total Time (seconds)</td>
      <td>Total Calories</td>
    </tr>
    <tr>
      <td id="speed"></td>
      <td id="incline"></td>
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
