import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import Register1View from '../views/Register1View.vue'
import Register2View from '../views/Register2View.vue'
import Register3View from '../views/Register3View.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', name: 'Login', component: LoginView },

  { path: '/register', name: 'Register1', component: Register1View },
  { path: '/register/step2', name: 'Register2', component: Register2View },
  { path: '/register/step3', name: 'Register3', component: Register3View },

  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicRoutes = ['Login', 'Register1', 'Register2', 'Register3']

  if (!token && !publicRoutes.includes(to.name)) {
    return next({ name: 'Login' })
  }
  next()
})

export default router