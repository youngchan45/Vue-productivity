import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入treegird插件
// import treeTable from 'vue-table-with-tree-grid'
// //注册treeTable组件
// Vue.component('tree-table',treeTable)

//引入基本模板
let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/pie')
require("echarts/lib/chart/line");
require("echarts/lib/chart/line");
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts //引入组件
export default echarts
export const eventBus = new Vue()
// 建立中转站，实现组件与组件之间的传值
// let bus = new Vue()
// Vue.prototype.bus = bus

Vue.config.productionTip = false
Vue.filter("timeset", str => {
  var dt = new Date(str);
  var y = dt.getFullYear();
  var m = ("0" + (dt.getMonth() + 1)).slice(-2);
  var d = ("0" + dt.getDate()).slice(-2);
  var h = ("0" + dt.getHours()).slice(-2);
  var mm = ("0" + dt.getMinutes()).slice(-2);
  //   // var s= ('0'+dt.getSeconds()).slice(-2)
  var s = dt
    .getSeconds()
    .toString()
    .padStart(2, "0");

  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
});

Vue.filter("personTime", str => {
  var dt = new Date(str);
  var y = dt.getFullYear();
  var m = ("0" + (dt.getMonth() + 1)).slice(-2);
  var d = ("0" + dt.getDate()).slice(-2);
  return `${y}.${m}.${d}`;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
