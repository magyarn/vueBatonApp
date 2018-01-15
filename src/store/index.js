import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedCompetitions: [
      {
        imageUrl: 'http://www.etonline.com/sites/default/files/images/2016-04/1280_cirque_du_soleil_ovo.jpg',
        id: 'america-youth-on-parade',
        title: 'America Youth On Parade',
        date: new Date(),
        description: 'An awesome baton competition!',
        location: 'South Bend, IN'
      },
      {
        imageUrl: 'https://www.billboard.com/files/media/09-Cirque-du-Soleils-SEP7IMO-DIA-press-2017-billboard-1548.jpg',
        id: 'congressional-cup-weekend',
        title: 'Congressional Cup Weekend',
        date: new Date(),
        description: 'An awesome baton competition!',
        location: 'Harrisburg, VA'
      },
      {
        imageUrl: 'https://leeds-list.com/wp-content/uploads/2016/12/cirque-du-soleil-dec-2016-no-credit.jpg',
        id: 'twirl-mania',
        title: 'Twirl Mania',
        date: new Date(),
        description: 'An awesome baton competition!',
        location: 'Orlando, FL'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createCompetition (state, payload) {
      state.loadedCompetitions.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createCompetition ({commit}, payload) {
      const competition = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
      firebase.database().ref('competitions').push(competition)
      .then((data) => {
        console.log(data)
        commit('createCompetition', competition)
      })
      .catch((error) => {
        console.log(error)
      })
      // Reach out to Firebase and store it
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredCompetitions: [],
            firstName: payload.firstName,
            lastName: payload.lastName,
            birthday: payload.birthday
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const returningUser = {
            id: user.uid,
            registeredCompetitions: [],
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday
          }
          commit('setUser', returningUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedCompetitions (state) {
      return state.loadedCompetitions.sort((a, b) => {
        return a.date > b.date
      })
    },
    loadedCompetition (state) {
      return (competitionid) => {
        return state.loadedCompetitions.find((competition) => {
          return competition.id === competitionid
        })
      }
    },
    featuredCompetitions (state, getters) {
      return getters.loadedCompetitions.slice(0, 2)
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
