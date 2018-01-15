<template>
  <v-container class="mt-0">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>{{competition.title}}</h1>
          </v-card-title>
          <v-card-media
              :src="competition.imageUrl"
              height="400px"
            ></v-card-media>
            <v-card-text>
              <h4 class="info--text">{{competition.date | date}} - {{competition.location}}</h4>
              <p>{{competition.description}}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn class="primary">Register</v-btn>
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
      }
    }
  }
</script>

