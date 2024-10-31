import { createRouter, createWebHistory } from 'vue-router'
import homepage from '/src/views/Homepage.vue'
import login from '/src/views/Login.vue'
import personalcenter from '/src/views/personalcenter.vue'
const routes = [
  {
    path: '/',
    name: 'homepage',
    component: homepage
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/personal_center',
    name:'personal_center',
    component:personalcenter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router