<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><span class="headline">Edit Competition Time</span></v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editedTime" style="width: 100%" actions>
              <template slot-scope="{save, cancel}">
                <v-btn
                  class="primary--text darken-1"
                  flat
                  @click="onSaveChanges">Save</v-btn>
                <v-btn
                  class="primary--text darken-1"
                  flat
                  @click.native="editDialog=false">Cancel</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['competition'],
    data () {
      return {
        editDialog: false,
        editedTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.competition.date)
        const hours = this.editedTime.match(/(\d+)/)[0]
        const minutes = this.editedTime.match(/:(\d+)/)[0].replace(':', '')
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateCompetitionData', {
          id: this.competition.id,
          date: newDate
        })
      }
    },
    created () {
      this.editedTime = new Date(this.competition.date).toTimeString()
    }
  }
</script>
