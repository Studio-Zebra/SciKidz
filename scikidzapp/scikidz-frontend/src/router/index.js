import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import Register1View from '../views/Register1View.vue'
import Register2View from '../views/Register2View.vue'
import Register3View from '../views/Register3View.vue'

// Add any other imports here (dashboard, other screens, etc.)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register1',
    component: Register1View
  },
  {
    path: '/register/step2',
    name: 'Register2',
    component: Register2View
  },
  {
    path: '/register/step3',
    name: 'Register3',
    component: Register3View
  },

  // Add other routes (dashboard, lessons, AR, etc.) here.
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
