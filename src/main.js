import Vue from 'vue'
import App from './App.vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import router from './router'

Vue.config.productionTip = false;
Vue.use(WeVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
