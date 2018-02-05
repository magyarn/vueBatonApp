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
              <img class="editedProfilePic" :src="editedProfilePic" alt="">
              <v-btn raised class="primary"
              @click="onPickFile">Upload Photo</v-btn>
              <input
                type="file"
                style="display:none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
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
  import * as firebase from 'firebase'
  export default {
    props: ['user'],
    data () {
      return {
        editDialog: false,
        editedFirstName: this.user.firstName,
        editedLastName: this.user.lastName,
        editedBirthday: this.user.birthday,
        editedHometown: this.user.hometown,
        editedProfilePic: this.user.profilePicUrl
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
          this.editedProfilePic = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.editedProfilePic = files[0]

        const name = this.editedProfilePic.name
        const ext = name.slice(filename.lastIndexOf('.'))
        firebase.storage().ref('users/' + this.$store.getters.user.id + '.' + ext).put(this.editedProfilePic)
        .then(() => {
          firebase.storage().ref('users/' + this.$store.getters.user.id + '.' + ext).getDownloadURL()
          .then(url => {
            this.editedProfilePic = url
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      },
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
          hometown: this.editedHometown,
          profilePicUrl: this.editedProfilePic
        })
      }
    }
  }
</script>

<style scoped>
  .editedProfilePic {
    max-width: 100%;
  }
</style>
