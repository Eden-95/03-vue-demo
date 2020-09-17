import Vue from 'vue'
import router from './router'
import App from './App.vue'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 全局注册组件
import './utils/global'
// 处理axios发送请求
import './utils/request'
// 配置全局过滤器
import './utils/filters'
// 全局导入vant
import './utils/vant'

import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
