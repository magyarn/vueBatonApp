<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <h1>My Profile</h1>
        <v-layout>
          <v-flex xs12>
            <v-btn raised class="primary"
            @click="onPickFile">Upload Photo</v-btn>
            <input
              type="file"
              style="display:none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
          </v-flex>
        </v-layout>
        <h2>Name</h2>
        <p>{{userDetails.firstName}} {{userDetails.lastName}}</p>
        <h2>Birthday</h2>
        <p>{{userDetails.birthday}}</p>
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
        image: null
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file.')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
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
