import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://itlead.vicp.net:9905/archive'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config;
})
// import login from '../components/Login.vue'
const login = () => import('../components/Login.vue')
const home = () => import('../components/Home.vue')
const accountmanagement = () => import("../components/Usermanagement/Accountmanagement.vue")
const organization = () => import('../components/Usermanagement/Organization.vue')
Vue.use(VueRouter)
const rolemanagement = () => import('../components/Usermanagement/Rolemanagement.vue')
const dictionarymanagement = () => import('../components/Systemmanagement/Dictionarymanagement.vue')
const menumanagement = () => import("../components/Systemmanagement/Menumanagement.vue")
const logmanagement = () => import('../components/Systemmanagement/Logmanagement.vue')
const index = () => import('../components/Index.vue')
const archivesmanagement = () => import('../components/Archivesmanagement/Archivesmanagement.vue')
const archivesinfo = () => import('../components/Archivesmanagement/Archivesinfo.vue')
const recordcomparison = () => import('../components/Archivesmanagement/Recordcomparison.vue')
const socialRelations = () => import('../components/Archivesmanagement/SocialRelations.vue')
const colligateSearch = () => import('../components/ColligateSearch/Search.vue')
const leaflet = () => import('../components/Leaflet/Leaflet.vue')
const basicInformation = () => import("../components/Subjectanalysis/Project1/Basicinformation.vue")

const routes = [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/home/index',
        component: index
      },
      {
        path: '/colligateSearch/colligateSearch',
        component: colligateSearch
      },
      {
        path: "/userManagement/accountManagement",
        component: accountmanagement
      },
      {
        path: '/staffLeaflet/staffLeaflet',
        component: leaflet
      },
      {
        path: "/userManagement/organizationStructure",
        component: organization
      },
      {
        path: '/userManagement/roleManagement',
        component: rolemanagement
      },
      {
        path: '/systemManagement/dictionaryManagement',
        component: dictionarymanagement
      },
      {
        path: '/systemManagement/menuManagement',
        component: menumanagement
      },
      {
        path: '/systemManagement/logManagement',
        component: logmanagement
      },
      {
        path: '/archivesManagement/archivesManagement',
        component: archivesmanagement
      },
      {
        path: '/archive/infoPerson',
        component: archivesinfo
      },
      // {
      //   path:'/archive/infoPerson:type:idcard:dateYear',
      //   component:archivesinfo
      // },
      // {
      //   path:'/archive/infoPerson,{
      //     params:{
      //       type:'',
      //       idcard:'',
      //       dateYear:'',
      //     }
      //   }',
      //   component:archivesinfo
      // }
      {
        path: '/archive/recordcomparison',
        component: recordcomparison
      },
      {
        path: '/archive/socialRelations',
        component: socialRelations
      },
      {
        path: '/special/basetest',
        conponent: basicInformation
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由导航守卫控制访问权限
//如果用户没有登录，但是直接通过url访问特定页面，需要重新导航到登录页面
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 发表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //next() 直接放行 next('/login') 强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
