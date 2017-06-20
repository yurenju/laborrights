import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Profile from '@/components/Profile'
import General from '@/components/General'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/general',
      name: 'General',
      component: General
    }
  ]
})
