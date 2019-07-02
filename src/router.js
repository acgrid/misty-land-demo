import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import(/* webpackChunkName: "quiz" */ './views/Quiz.vue')
    },
    {
      path: '/character/:id',
      name: 'character',
      component: () => import(/* webpackChunkName: "char" */ './views/Character')
    }
  ]
})
