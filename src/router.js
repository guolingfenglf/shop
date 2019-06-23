import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const r=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/welcome',
          component: () => import('./views/Welcome.vue')
        },
        {
          path: '/users',
          component: () => import('./views/User.vue')
        },
        {
          path: '/roles',
          component: () => import('./views/Role.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    }
  
  ]
})
r.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.path == '/login') return next()
  let token=sessionStorage.getItem('token')
  if (token) {
    return next()
  }else{
    return next('/login')
  }
})
export default r