<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-layout row wrap>
          <v-flex xs12>
            <v-container m0 p0>
              <v-layout row no-wrap>
                <h1>My Profile</h1>
                <v-spacer></v-spacer>
                <app-edit-profile-dialog
                  :user="user"
                ></app-edit-profile-dialog>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <img :src="user.profilePicUrl" class="profilePic" alt="user.firstName user.lastName Headshot"/>
        <h2>Name</h2>
        <p>{{user.firstName}} {{user.lastName}}</p>
        <h2>Hometown</h2>
        <p>{{user.hometown}}</p>
        <h2>Birthday</h2>
        <p>{{user.birthday}}</p>
        <h2>Upcoming Competitions</h2>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs12 sm4 v-for="competition in registeredCompetitionData" :key="competition.id">
              <v-card :to="'/competitions/' + competition.id">
                <v-card-media :src="competition.imageUrl" height="200px"></v-card-media>
                <v-card-title>
                  <div>
                    <h3 primary-title>{{competition.title}}</h3>
                    <span class="grey--text">{{competition.date | date}}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    data () {
      return {
        registeredCompetitionData: [],
        image: null,
        imageUrl: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      userDetails () {
        return this.$store.getters.userDetails
      }
    },
    mounted () {
      const registeredCompetitionIDs = this.$store.getters.user.registeredCompetitions
      registeredCompetitionIDs.map(competitionID => {
        firebase.database().ref('/competitions/').once('value')
          .then(data => {
            const fbData = data.val()
            this.registeredCompetitionData.push({
              ...fbData[competitionID],
              id: competitionID
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
</script>

<style scoped>
  .profilePic {
    max-width: 200px;
  }
</style>
