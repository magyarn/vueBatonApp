// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VAlert,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/Alert'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCYLhd0EGVJb1kE1GI07jfV7rjG17Qly64',
      authDomain: 'baton-app.firebaseapp.com',
      databaseURL: 'https://baton-app.firebaseio.com',
      projectId: 'baton-app',
      storageBucket: 'baton-app.appspot.com'
    }
   )
  }
})
