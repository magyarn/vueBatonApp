<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><span class="headline">Edit Profile</span></v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="firstName"
                label="First Name"
                id="firstName"
                required
                v-model="editedFirstName"
              ></v-text-field>
              <v-text-field
                name="lasttName"
                label="Last Name"
                id="lasttName"
                required
                v-model="editedLastName"
              ></v-text-field>
              <v-text-field
                name="hometown"
                label="Hometown"
                id="hometown"
                required
                v-model="editedHometown"
              ></v-text-field>
              <v-text-field
                name="birthday"
                label="Birthday"
                id="birthday"
                required
                v-model="editedBirthday"
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
    props: ['user'],
    data () {
      return {
        editDialog: false,
        editedFirstName: this.user.firstName,
        editedLastName: this.user.lastName,
        editedBirthday: this.user.birthday,
        editedHometown: this.user.hometown
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedFirstName.trim() === '' || this.editedLastName.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateUserProfileData', {
          id: this.user.id,
          firstName: this.editedFirstName,
          lastName: this.editedLastName,
          birthday: this.editedBirthday,
          hometown: this.editedHometown
        })
      }
    }
  }
</script>
