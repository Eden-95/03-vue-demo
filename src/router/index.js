import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/my-follow', component: MyFollow, name: 'my-follow' },
  { path: '/my-comment', component: MyComment, name: 'my-comment' },
  { path: '/my-star', component: MyStar, name: 'my-star' }
]

const router = new VueRouter({
  routes
})
// 配置全局导航守卫
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')

  const authUrls = [
    '/user',
    '/user-edit',
    '/my-follow',
    '/my-comment',
    '/my-star'
  ]
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
