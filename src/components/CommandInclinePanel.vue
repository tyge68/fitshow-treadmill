<template>
  <div class="col btn-group">
    <div class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Incline Level"><i class="fas fa-mountain"></i></div>
    <button v-for="n in 6" v-bind:key="n" @click="changeIncline" type="button" class="btn btn-primary" disabled>{{ n * 2 }}</button>
  </div>
</template>

<script>
import { BTService } from '../services/BTService';

export default {
  name: 'CommandInclinePanel',
  methods: {
    changeIncline: function (event) {
      var newIncline = parseInt(event.target.innerHTML);
      BTService.sendIncAndSpeed(newIncline, -1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
