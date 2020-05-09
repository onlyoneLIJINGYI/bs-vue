import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "styles/reset.css"; //引入reset.css重置默认样式，使不同设备渲染出来样式效果一样
Vue.use(ElementUI)
import axios from 'axios'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios=axios
//axios 主动开启 withCredentials 功能，使前端可以携带cookie，这样每次发送请求就会带上 sessionId，shiro 就可以通过 sessionId 获取登录状态并执行是否登录的判断。
axios.defaults.withCredentials = true


Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
