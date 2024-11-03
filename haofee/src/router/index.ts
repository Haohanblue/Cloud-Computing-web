import { createRouter, createWebHistory } from 'vue-router'
import homepage from '/src/views/Homepage.vue'
import LoginCard from '/src/views/LoginCard.vue'
import personalcenter from '/src/views/personalcenter.vue'
import PayResult from '/src/views/payresult.vue'
import Order from '/src/views/Order.vue'
import Menu from '/src/views/Menu.vue'
import OrderItem from '/src/views/OrderItem.vue'
import Admin from '/src/views/Admin.vue'
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
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path:'/menu',
    name:'Menu',
    component:Menu
  },
  {
    path: '/orderitem/:orderId',
    name: 'OrderItem',
    component: OrderItem
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router