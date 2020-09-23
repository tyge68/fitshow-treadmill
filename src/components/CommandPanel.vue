<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <div class="labelled"><md-icon>{{ iconName }}<md-tooltip md-direction="top">{{ title }}</md-tooltip></md-icon></div>
    </div>
    <div class="md-layout-item" v-for="n in 6" v-bind:key="n">
      <md-button @click="changeCommand" class="md-primary" :disabled="!$store.state.started">{{ n * 2 }}</md-button>
    </div>
  </div>
</template>

<script>
import { BTService } from '../services/BTService';

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
  methods: {
    changeCommand: function (event) {
      var newValue = parseInt(event.target.innerHTML);
      if (this.commandType === 'speed') {
        BTService.sendIncAndSpeed(-1, newValue);
      } else {
        BTService.sendIncAndSpeed(newValue, -1);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.labelled {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
