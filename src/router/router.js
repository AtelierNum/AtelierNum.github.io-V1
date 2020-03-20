import Vue from 'vue'
import Router from 'vue-router'
import globalList from '../assets/globalList.json'


Vue.use(Router)

let routes_courses = Object.keys(globalList).map( type => ({
  path: type,
  name: type,
  component: () => import('../pages/Course.vue'),
  children :
    globalList[type].map( file => ({
      path: file.id,
      name: file.name,
      component: () => import('../assets/markdowns/' + file.id + '.md')
    }))
})) 

// const routes_courses = globalList.courses.map( course => ({
//   path : 'courses/' + course.id,
//   name : course.name,
//   component: () => import('../assets/markdowns/' + course.id + '.md')
// }))

// routes_courses = [ ...routes_courses[0].children, ...routes_courses[1].children, ...routes_courses[2].children ] ;

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
        // { path: 'courses/projet', name:'projet', component: () => import('../pages/Course.vue') },
        // { path: 'course', component: () => import('../pages/Course.vue') },
        // { path: 'project', component: () => import('../pages/Project.vue') },
        ...routes_courses
      ]
    }
  
  ]
})
