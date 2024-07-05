import { createWebHistory, createRouter } from 'vue-router'

import AppHome from './pages/AppHome.vue'
import AppApartments from './pages/AppApartments.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', name: 'home', component: AppHome },
    { path: '/apartments', name: 'apartments', component: AppApartments },
  ]
})

export default router