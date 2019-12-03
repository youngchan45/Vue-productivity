import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://192.168.2.153:8088/'
Vue.prototype.$http = axios
// import login from '../components/Login.vue'
const login = () => import('../components/Login.vue')

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    component: login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
