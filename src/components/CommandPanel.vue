<template>
  <div class="col btn-group">
    <div class="btn btn-secondary" data-toggle="tooltip" data-placement="top" :title="title"><i class="fas" :class="iconName"></i></div>
    <button v-for="n in 6" v-bind:key="n" @click="changeCommand" type="button" class="btn btn-primary" :disabled="!started">{{ n * 2 }}</button>
  </div>
</template>

<script>
import { BTService } from '../services/BTService';
import { EventBus } from '../event-bus';

export default {
  name: 'CommandPanel',
  props: {
    title: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    commandType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      started: false
    };
  },
  methods: {
    changeCommand: function (event) {
      var newValue = parseInt(event.target.innerHTML);
      if (this.commandType === 'speed') {
        BTService.sendIncAndSpeed(-1, newValue);
      } else {
        BTService.sendIncAndSpeed(newValue, -1);
      }
    }
  },
  created() {
    let thisObj = this;
    EventBus.$on('btRunning', () => {
      thisObj.started = true;
    });
    EventBus.$on('btStopped', () => {
      thisObj.started = false;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
