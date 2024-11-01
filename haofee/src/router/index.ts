import { createRouter, createWebHistory } from 'vue-router'
import homepage from '/src/views/Homepage.vue'
import LoginCard from '/src/views/LoginCard.vue'
import personalcenter from '/src/views/personalcenter.vue'
import PayResult from '/src/views/payresult.vue'
const routes = [
  {
    path: '/',
    name: 'homepage',
    component: homepage
  },
  {
    path: '/login',
    name: 'LoginCard',
    component: LoginCard
  },
  {
    path:'/personal_center',
    name:'personal_center',
    component:personalcenter
  },
  {
    path: '/payresult',
    name: 'PayResult',
    component: PayResult
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router