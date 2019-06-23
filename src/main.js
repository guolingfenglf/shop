import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/global.css"
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1';
Vue.axios.interceptors.request.use( (config)=> {
  config.headers={Authorization:sessionStorage.getItem('token')}
  return config;
  })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
