<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><span class="headline">Edit Competition Date</span></v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editedDate" style="width: 100%" actions>
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
            </v-date-picker>
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
        editedDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.competition.date)
        const newDay = new Date(this.editedDate).getUTCDate()
        const newMonth = new Date(this.editedDate).getUTCMonth()
        const newYear = new Date(this.editedDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateCompetitionData', {
          id: this.competition.id,
          date: newDate
        })
      }
    },
    created () {
      this.editedDate = new Date(this.competition.date).toISOString()
    }
  }
</script>
