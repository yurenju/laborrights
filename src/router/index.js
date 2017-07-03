import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Profile from '@/components/Profile'
import Female from '@/components/Female'
import General from '@/components/General'
import Worktime from '@/components/Worktime'
import Termination from '@/components/Termination'
import Contact from '@/components/Contact'

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
      path: '/female',
      name: 'Female',
      component: Female
    },
    {
      path: '/general',
      name: 'General',
      component: General
    },
    {
      path: '/worktime',
      name: 'Worktime',
      component: Worktime
    },
    {
      path: '/termination',
      name: 'Termination',
      component: Termination
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
