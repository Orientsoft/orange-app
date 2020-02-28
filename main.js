import Vue from 'vue'
import App from './App'
import store from './store'
import utils from './utils/tools.js'
import cuCustom from './css/components/cu-custom.vue'
import mixLoadMore from './components/mix-load-more/mix-load-more.vue'
import validCode from './components/validCode.vue' //密码弹窗
Vue.component('validcode',validCode)
Vue.component('cu-custom',cuCustom)
Vue.component('mixLoadMore',mixLoadMore)
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$utils = utils;


App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
