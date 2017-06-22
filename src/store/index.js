import Vue from 'vue'
import Vuex from 'vuex'
import { Gender } from 'labor-standards-tw'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 20,
    monthlySalary: 24000,
    onboard: '2017-01-03',
    gender: Gender.UNSPECIFIED,
    restDay: 6,
    regularLeave: 0
  },
  mutations: {
    setProperties (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
})
