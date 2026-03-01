import { createRouter, createWebHistory } from 'vue-router'

//Login and registration views
import LoginView from '../views/LoginView.vue'
import Register1View from '../views/Register1View.vue'
import Register2View from '../views/Register2View.vue'
import Register3View from '../views/Register3View.vue'
//Dashboard view
import DashboardView from '../views/DashboardView.vue'
//Control flow views
import LessonView from '../views/LessonView.vue'
import ARView from '../views/ARView.vue'
import RecapView from '../views/RecapView.vue'
import QuizView from '../views/QuizView.vue'
import QuizResultsView from '../views/QuizResultsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { showMenu: false }
  },
  {
     path: '/register',
    name: 'Register1', 
    component: Register1View, 
    meta: { showMenu: false }
  },
  {
    path: '/register/step2',
    name: 'Register2',
    component: Register2View,
    meta: { showMenu: false }
  },
  {
    path: '/register/step3', 
    name: 'Register3',
    component: Register3View,
    meta: { showMenu: false } 
  },
  { path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView, 
    meta: { showMenu: true } 
  },
  {
    path: '/modules/:moduleId/lesson',
    name: 'Lesson',
    component: LessonView,
    meta: { showMenu: false } 
  },
  { path: '/modules/:moduleId/ar',
    name: 'AR', 
    component: ARView, 
    meta: { showMenu: false } 
  },
  { path: '/modules/:moduleId/recap', 
    name: 'Recap',
    component: RecapView, 
    meta: { showMenu: false } 
  },
  { path: '/modules/:moduleId/quiz',
    name: 'Quiz', 
    component: () => import('../views/QuizView.vue'), 
    meta: {showMenu: false}
  },
  { path: '/modules/:moduleId/results', 
    name: 'ModuleResults', 
    component: () => import('../views/QuizResultsView.vue'),
    meta: { showMenu: false }
  },
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