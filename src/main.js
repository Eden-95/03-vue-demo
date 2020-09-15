import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 全局引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'
import axios from 'axios'

// 全局导入组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmNavitem from './components/HmNavitem.vue'

import moment from 'moment'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vant)
// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)

Vue.config.productionTip = false
// 全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
