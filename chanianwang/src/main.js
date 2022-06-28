import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'

import '/public/css/reset.css'
import '/public/js/flexible.js'
import '/public/font/iconfont.css'
import '@/plugins/vant'
import LyTab from 'ly-tab';
import { myAxios } from '@/api/myAxios'
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.use(LyTab);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$myAxios = myAxios
  }
}).$mount('#app')
