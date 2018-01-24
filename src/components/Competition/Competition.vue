<template>
  <v-container class="mt-0">
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          v-bind:indeterminate="true"
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>{{competition.title}}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-competition-details-dialog
                :competition="competition"
              ></app-edit-competition-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
              :src="competition.imageUrl"
              height="400px"
            ></v-card-media>
            <v-card-text>
              <h4 class="info--text">{{competition.date | date}} - {{competition.location}}</h4>
              <div><app-edit-competition-date-dialog
                :competition="competition"
                v-if="userIsCreator"
                ></app-edit-competition-date-dialog>
              <app-edit-competition-time-dialog
                :competition="competition"
                v-if="userIsCreator"
              ></app-edit-competition-time-dialog></div>
              <p>{{competition.description}}</p>
            </v-card-text>
            <v-card-actions>
                <app-register-dialog
                  v-if="userIsAuthenticated && !userIsCreator"
                  :competitionId="competition.id"></app-register-dialog>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      competition () {
        return this.$store.getters.loadedCompetition(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.competition.creatorId
      }
    }
  }
</script>
