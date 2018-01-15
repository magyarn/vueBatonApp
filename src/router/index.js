import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/Home'
import Competition from '@/components/Competition/Competition'
import Competitions from '@/components/Competition/Competitions'
import CreateCompetition from '@/components/Competition/CreateCompetition'
import Profile from '@/components/User/Profile'
import SignUp from '@/components/User/SignUp'
import SignIn from '@/components/User/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/competitions',
      name: 'Competitions',
      component: Competitions
    },
    {
      path: '/competitions/:id',
      name: 'Competition',
      component: Competition,
      props: true
    },
    {
      path: '/competition/new',
      name: 'CreateCompetition',
      component: CreateCompetition
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ],
  mode: 'history'
})
