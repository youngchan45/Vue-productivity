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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
