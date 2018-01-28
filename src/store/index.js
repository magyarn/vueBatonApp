import Vue from 'vue'
import Vuex from 'vuex'

import competition from './competition'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    competition: competition,
    user: user,
    shared: shared
  }
})
