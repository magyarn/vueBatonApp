<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn accent primary slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title
              v-if="userIsRegistered"
            ><span class="headline">Unregister from Competition</span></v-card-title>
            <v-card-title
              v-else
            ><span class="headline">Register for Competition</span></v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your mind later.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="green--text darken-1"
                flat
                @click="onConfirmRegistration">Confirm</v-btn>
              <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog=false">
                  Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['competitionId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredCompetitions.findIndex(competitionId => {
          return competitionId === this.competitionId
        }) >= 0
      }
    },
    methods: {
      onConfirmRegistration () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromCompetition', this.competitionId)
        } else {
          this.$store.dispatch('registerUserForCompetition', this.competitionId)
        }
      }
    }
  }
</script>
