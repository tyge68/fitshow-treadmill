<template>
  <div class="col btn-group">
    <div class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Speed Level"><i class="fas fa-tachometer-alt"></i></div>
    <button v-for="n in 6" v-bind:key="n" @click="changeSpeed" type="button" class="btn btn-primary" disabled>{{ n * 2 }}</button>
  </div>
</template>

<script>
import { BTService } from '../services/BTService';

export default {
  name: 'CommandSpeedPanel',
  methods: {
    changeSpeed: function (event) {
      var newSpeed = parseInt(event.target.innerHTML);
      BTService.sendIncAndSpeed(-1, newSpeed);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
