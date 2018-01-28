<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <h1>My Profile</h1>
        <h2>Name</h2>
        <p>{{userDetails.firstName}} {{userDetails.lastName}}</p>
        <h2>Birthday</h2>
        <p>{{userDetails.birthday}}</p>
        <h2>Upcoming Competitions</h2>
        {{user}}
        {{getRegisteredCompetitions}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      },
      userDetails () {
        return this.$store.getters.userDetails
      },
      getRegisteredCompetitions () {
        const registeredCompetitions = this.$store.getters.getRegisteredCompetitions
        console.log('Comps', registeredCompetitions)
        registeredCompetitions.map(competition => {
          firebase.database().ref('/competitions/').once('value')
            .then(data => {
              const fbData = data.val()
              const compData = []
              for (let key in fbData) {
                if (key === competition) {
                  compData.push(fbData[key])
                }
              }
              // commit('setRegisteredCompetitionData', compData)
              // commit('setLoading', false)
              console.log('Compdata', compData)
            })
            .catch(error => {
              console.log(error)
            })
        })
      }
    }
  }
</script>
