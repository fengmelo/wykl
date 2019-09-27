import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/common/scss/reset.scss'

Vue.config.productionTip = false

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/moren.png')
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
