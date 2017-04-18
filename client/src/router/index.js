import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import Content from '@/components/Content'
import Detail from '@/components/Detail'
import Ask from '@/components/Ask'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/post/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/post',
      name: 'Ask',
      component: Ask
    }
  ]
})
