<template>
<div class="page-container">
    <router-view />
</div>
</template>

<script>
import { EventBus } from './event-bus'

export default {
  name: 'App',
  created() {
    let thisObj = this
    EventBus.$on('btDisconnected', () => {
      thisObj.$router.push({ path: "/" })
    })
  }
}
</script>

<style>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}

html {
  background-color: #ffffff;
}
</style>
