import * as firebase from 'firebase'

export default {
  state: {
    loadedCompetitions: [],
    loadedUsers: []
  },
  mutations: {
    setLoadedCompetitions (state, payload) {
      state.loadedCompetitions = payload
    },
    setLoadedUsers (state, payload) {
      state.loadedUsers = payload
    },
    createCompetition (state, payload) {
      state.loadedCompetitions.push(payload)
    },
    updateCompetitionData (state, payload) {
      const competition = state.loadedCompetitions.find(competition => {
        return competition.id === payload.id
      })
      if (payload.title) {
        competition.title = payload.title
      }
      if (payload.description) {
        competition.description = payload.description
      }
      if (payload.date) {
        competition.date = payload.date
      }
    }
  },
  actions: {
    loadCompetitions ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('competitions').once('value')
        .then((data) => {
          const competitions = []
          const obj = data.val()
          for (let key in obj) {
            competitions.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedCompetitions', competitions)
          commit('setLoading', false)
        }
        )
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadUsers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('users').once('value')
        .then(data => {
          const users = []
          const obj = data.val()
          for (let key in obj) {
            const userDetails = obj[key].userDetails
            const detailKey = Object.keys(userDetails)[0]
            const regComps = obj[key].registeredCompetitions || {}
            const regCompsKey = Object.keys(regComps)[0] || ''
            users.push({
              id: key,
              firstName: userDetails[detailKey].firstName,
              lastName: userDetails[detailKey].lastName,
              birthday: userDetails[detailKey].birthday,
              profilePicUrl: userDetails[detailKey].profilePicUrl,
              hometown: userDetails[detailKey].hometown,
              registeredCompetitions: regComps[regCompsKey] || []
            })
          }
          console.log(users)
          commit('setLoadedUsers', users)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createCompetition ({commit, getters}, payload) {
      const competition = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('competitions').push(competition)
      .then((data) => {
        key = data.key
        console.log('Success! ', data)
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('competitions/' + key + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('competitions').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createCompetition', {
          ...competition,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
      // Reach out to Firebase and store it
    },
    updateCompetitionData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('competitions').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateCompetitionData', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedCompetitions (state) {
      return state.loadedCompetitions.sort((a, b) => {
        return a.date > b.date
      })
    },
    loadedUsers (state) {
      return state.loadedUsers
    },
    loadedCompetition (state) {
      return (competitionid) => {
        return state.loadedCompetitions.find((competition) => {
          return competition.id === competitionid
        })
      }
    },
    featuredCompetitions (state) {
      return state.loadedCompetitions.slice(0, 2)
    }
  }
}
