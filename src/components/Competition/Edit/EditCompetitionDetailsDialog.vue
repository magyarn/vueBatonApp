<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><span class="headline">Edit Competition</span></v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                required
                v-model="editedDescription"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="primary--text darken-1" @click="onSaveChanges">Save</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat class="primary--text darken-1" @click="editDialog=false">Cancel</v-btn>
            </v-card-actions>
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
        editedTitle: this.competition.title,
        editedDescription: this.competition.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateCompetitionData', {
          id: this.competition.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
</script>
