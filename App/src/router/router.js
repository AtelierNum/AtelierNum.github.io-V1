import Vue from 'vue'
import Router from 'vue-router'
import globalList from '../assets/globalList.json'


Vue.use(Router)

let routes_courses = Object.keys(globalList).map( type => ({
  path: `${type}/:content`,
  name: type,
  component: () => import('../pages/Documentation.vue'),
})) 


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name:'layout',
      component: () => import('../layout/AppLayout.vue'),
      children: [
        { path: '', name:'home', component: () => import('../pages/Index.vue') },
        { path: '/courses', name:'courses', component: () => import('../pages/Category.vue') },
        { path: '/ressources', name:'ressources', component: () => import('../pages/Category.vue') },
        { path: '/projects', name:'projects', component: () => import('../pages/Category.vue') },
        ...routes_courses
      ]
    }
  
  ]
})
