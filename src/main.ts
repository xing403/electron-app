import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './assets/style.css'
import Router from './router'
import App from './App.vue'

createApp(App)
.use(ElementPlus)
.use(Router)
.mount('#app')
