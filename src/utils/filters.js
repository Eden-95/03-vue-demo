import Vue from 'vue'
import moment from 'moment'
// 全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
