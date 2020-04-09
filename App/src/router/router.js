import Vue from 'vue'
import Router from 'vue-router'
import globalList from '../assets/globalList.json'


Vue.use(Router)

let routes_courses = Object.keys(globalList).map( type => ({
  path: `${type}/:content`,
  name: type + '_content',
  component: () => import('../pages/Documentation.vue'),
})) 

// let routes_courses = Object.keys({'projects': globalList.projects, 'courses' : globalList.courses}).map( type => 
//   globalList[type].map( content => ({
//     path: type + '/' + content.id,
//     name: content.id,
//     type: type,
//     component: () => import('../pages/Documentation.vue'),
//   }))
// ) 

// routes_courses = [...routes_courses[0], ...routes_courses[1]];


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
        { path: '/mentions', name:'mentions', component: () => import('../pages/Mentions.vue') },
        { path: '/about', name:'about', component: () => import('../pages/About.vue') },
        { path: '/courses', name:'courses', component: () => import('../pages/Category.vue') },
        { path: '/ressources', name:'ressources', component: () => import('../pages/Category.vue') },
        { path: '/projects', name:'projects', component: () => import('../pages/Category.vue') },
        ...routes_courses
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
})
