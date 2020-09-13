<template>
<div class="container">
  <div class="col btn-group">
    <div class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Incline Level"><i class="fas fa-mountain"></i></div>
    <button v-for="n in 6" v-bind:key="n" @click="changeIncline" type="button" class="btn btn-primary">{{ n * 2 }}</button>
  </div>
  <div class="col btn-group">
    <div class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Speed Level"><i class="fas fa-tachometer-alt"></i></div>
    <button v-for="n in 6" v-bind:key="n" @click="changeSpeed" type="button" class="btn btn-primary">{{ n * 2 }}</button>
  </div>
</div>
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  name: 'CommandPanel',
  methods: {
    changeIncline: function (event) {
      var newIncline = parseInt(event.target.innerHTML);
      EventBus.$emit('changeIncline', newIncline);
    },
    changeSpeed: function (event) {
      var newSpeed = parseInt(event.target.innerHTML);
      EventBus.$emit('changeSpeed', newSpeed);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
