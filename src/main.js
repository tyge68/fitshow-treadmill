import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Vuelidate from 'vuelidate'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false
import { EventBus } from './event-bus'

// set defaults for Chart
window.Chart.defaults.global.animation.duration = 0;

new Vue({
  router,
  store,
  created() {
    EventBus.$on('btRunning', () => {
      store.commit('start')
    })
    EventBus.$on('btStopped', () => {
      store.commit('stop')
    })
    EventBus.$on('btConnected', () => {
      store.commit('connect')
    })
    EventBus.$on('btDisconnected', () => {
      store.commit('disconnect')
    })
    EventBus.$on('trainingProgramStarted', () => {
      store.commit('run')
    })
  },
  render: h => h(App),
}).$mount('#app')
