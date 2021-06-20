import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 系统类型 ios android
    osType: '',
  },
  getters: {
    getOsType: state => state.osType,
  },
  mutations: {
    setOsType (state, osType) {
      state.osType = osType;
    },
  },
  actions: {},
  modules: {}
})
