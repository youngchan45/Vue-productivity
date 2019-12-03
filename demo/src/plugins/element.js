import Vue from 'vue'
import { Button } from 'element-ui'
import { form } from 'element-ui'
import { formItem } from 'element-ui'
import { input } from 'element-ui'
import { checkbox } from 'element-ui'
import { message } from 'element-ui'

Vue.use(Button)
Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(checkbox)
Vue.prototype.$message = message
