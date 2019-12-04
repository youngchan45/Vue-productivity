import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://192.168.2.153:8088/'
Vue.prototype.$http = axios
// import login from '../components/Login.vue'
const login = () => import('../components/Login.vue')
const home =()=>import('../components/Home.vue')

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    component: login,
  },
  {
    path:'/home',
    component:home,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  //路由导航守卫控制访问权限
    //如果用户没有登录，但是直接通过url访问特定页面，需要重新导航到登录页面
    router.beforeEach((to,from,next)=>{
//to 将要访问的路径
//from 发表从哪个路径跳转而来
//next 是一个函数，表示放行
//next() 直接放行 next('/login') 强制跳转
if(to.path==='/login') return next();
//获取token
const tokenstr=window.sessionStorage.getItem('token')
if(!tokenstr) return next('/login')
next()
    })

export default router
