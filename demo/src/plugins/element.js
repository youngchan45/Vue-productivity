import Vue from 'vue'
import { Button, form, formItem, input, checkbox, message, Menu, submenu,MenuItemGroup,menuItem,container,header,main,footer,aside,dialog,popconfirm,popover } from 'element-ui'

Vue.use(Button)
Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(checkbox)
Vue.prototype.$message = message
// Vue.prototype.$dialog = dialog
Vue.use(Menu)
Vue.use(menuItem)
Vue.use(container)
Vue.use(main)
Vue.use(header)
Vue.use(footer)
Vue.use(submenu)
Vue.use(MenuItemGroup)
Vue.use(aside)
Vue.use(dialog)
Vue.use(popconfirm)
Vue.use(popover)
