import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Instructions from '../components/Instructions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router