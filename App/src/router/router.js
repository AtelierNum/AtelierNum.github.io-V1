import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../layout/AppLayout.vue'),
      children: [
        { path: '', component: () => import('../pages/Index.vue') },
        { path: 'course', component: () => import('../pages/Course.vue') },
        { path: 'project', component: () => import('../pages/Project.vue') }
      ]
    }
  
  ]
})
