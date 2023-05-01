import { createApp } from 'vue'
import App from './App.vue'   
import router from './router'
import store from './store'

//creatApp函数，Vue3中创建应用程序实例的函数，接受一个根组件，并返回一个应用程序实例
createApp(App).use(store).use(router).mount('#app')  
