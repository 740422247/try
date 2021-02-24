// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import addr from './addr'
import mixin from './mixin/mixinDemo'
import AddrPicker from './picker'
import notify from './plug/notify'
import formate from "./common/formate"


Vue.use(AddrPicker)
Vue.use(notify)
Vue.use(formate)

Vue.config.productionTip = false
Vue.use(addr)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
Vue.filter('formate',function(val,flag){
  switch (flag){
    case 'money':
      return formate.formateMoney(val)
    default:
      return formate.formateNum(val)
  }
});
