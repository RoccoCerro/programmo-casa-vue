import { createWebHistory, createRouter } from 'vue-router'

import AppHome from './pages/AppHome.vue'
import AppApartments from './pages/AppApartments.vue'
import AppMessages from './pages/AppMessages.vue'
import AppApartment from './pages/AppApartment.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', name: 'home', component: AppHome },
    { path: '/apartments', name: 'apartments', component: AppApartments },
    { path: '/messages', name: 'messages', component: AppMessages },
    { path: '/apartment', name: 'apartment', component: AppApartment },


  ]
})

export default router