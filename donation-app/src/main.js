import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import Router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')
