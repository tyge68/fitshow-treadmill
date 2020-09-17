import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    connected: false,
    started: false,
    running: false,
    toggleCount: 0
  },
  mutations: {
    togglePanels(state) {
        state.toggleCount++;
    },
    connect (state) {
        state.connected = true;
    },
    disconnect (state) {
        state.connected = false;
    },
    start (state) {
        state.started = true;
    },
    stop (state) {
        state.started = false;
        state.running = false;
    },
    run (state) {
        state.running = true;
    }
}
})