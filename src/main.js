import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/common.css';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
Vue.use(Vant);

Vue.config.productionTip = false
import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
// window.location.origin 兼容IE
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
