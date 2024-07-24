import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home-View.vue'
import Login from '../views/Login-View.vue'
import Register from '../views/Register-View.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Home  ' } },
  { path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
  { path: '/register', name: 'Register', component: Register, meta: { title: 'Register' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
