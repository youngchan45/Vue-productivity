//导入element.js npm 
//install element-ui -S

import Vue from 'vue'
import { Button, form, formItem, input, checkbox, message, Menu, submenu, MenuItemGroup, menuItem, container, header, main, footer, aside, dialog, popconfirm, popover, table, tableColumn, pagination, card, tag, datePicker, MessageBox, select,option,tree,col,row,tabs,tabPane,link,optionGroup,breadcrumb,breadcrumbItem,checkboxGroup,radio  } from 'element-ui'

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
Vue.use(table)
Vue.use(tableColumn)
Vue.use(pagination)
Vue.use(card)
Vue.use(tag)
Vue.use(datePicker)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(select)
Vue.use(option)
Vue.use(tree)
Vue.use(col)
Vue.use(row)
Vue.use(tabs)
Vue.use(tabPane)
Vue.use(link)
Vue.use(optionGroup)
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(checkboxGroup)
Vue.use(radio)