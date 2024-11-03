// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import Vant from 'vant';
import { PullRefresh } from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'

axios.defaults.withCredentials = true

const app = createApp(App).use(router)

app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.mount('#app')
app.use(Vant).use(PullRefresh);