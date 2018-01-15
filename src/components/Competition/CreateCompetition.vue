<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Create Competition</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              >
              </v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              >
              </v-text-field>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                required
                v-model="imageUrl"
              >
              </v-text-field>
              <v-layout row>
                <v-flex xs>
                  <img :src="imageUrl" alt="" style="max-width:100%">
                </v-flex>
              </v-layout>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                required
                v-model="description"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Choose a Date & Time</h4>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs12 sm3 offset-sm3>
        <v-date-picker
        v-model="date"
        landscape>
        </v-date-picker>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs12 sm3 offset-sm3>
        <v-time-picker
        v-model="time"
        landscape>
      </v-time-picker>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="sm6" offset-sm3>
        <v-btn 
          class="primary mx-0" 
          :disabled="!formIsValid"
          @click="onCreateCompetition">
          Create Competition
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date().toISOString(),
        time: new Date(),
        id: ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/(\d+)/)[0]
          const minutes = this.time.match(/:(\d+)/)[0].replace(':', '')
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.sethours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateCompetition () {
        const competitionData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime,
          id: this.title.toLowerCase().split(' ').join('-')
        }
        this.$store.dispatch('createCompetition', competitionData)
        this.$router.push(`/competitions/${competitionData.id}`)
      }
    }
  }
</script>
