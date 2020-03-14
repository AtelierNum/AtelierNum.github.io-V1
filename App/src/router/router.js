import Vue from 'vue'
import Router from 'vue-router'
import coursesList from '../assets/coursesList.json'


Vue.use(Router)

let routes_courses = Object.keys(coursesList).map( type => ({
  path: type,
  name: type,
  component: () => import('../pages/Documentation.vue'),
  children :
    coursesList[type].map( file => ({
      path: file.id,
      name: file.name,
      component: () => import('../assets/markdowns/' + file.id + '.md')
    }))
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
        ...routes_courses
      ]
    }
  
  ]
})
