<template>
  <v-container class="mt-5">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-btn large router to="/competitions" class="primary">Browse Competitions</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-linear
          v-bind:indeterminate="true"
          class="primary"
          :width="7"
          :size="70"
          v-if="loading">
        </v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="my-5" v-if="!loading">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="competition in featuredCompetitions"
            :src="competition.imageUrl"
            :key="competition.id"
            @click="onLoadCompetition(competition.id)"
            style="cursor: pointer">
            <div class="title m-0">
              {{competition.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      featuredCompetitions () {
        return this.$store.getters.featuredCompetitions
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadCompetition: function (id) {
        this.$router.push(`/competitions/${id}`)
      }
    }
  }
</script>

<style scoped>
  .title {
    background-color: rgba(0,0,0,.5);
    color: white;
    margin: 0 auto;
    position: absolute;
    bottom: 50px;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }
</style>
