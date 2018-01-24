<template>
  <v-container class="mt-0">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="info">
          <v-container fluid class="white">
            <v-layout row justify-space-between v-for="competition in competitions" :key="competition.id" class="mb-3">
              <v-flex xs5 sm4 md3>
                <v-card-media
                    :src="competition.imageUrl"
                    height="130px"
                  ></v-card-media>
              </v-flex>
              <v-flex xs5 sm5 md5>
                <v-card-title primary-title>
                  <div>
                   <h3 class="mb-0">{{competition.title}}</h3>
                   <p >{{competition.date | date}}</p>
                 </div>
               </v-card-title>
             </v-flex>
             <v-flex xs2 sm3 md3>
               <v-card-actions>
                  <v-btn flat :to="'/competitions/' + competition.id">
                    <v-icon left>arrow_forward</v-icon>
                    View More
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed:
  {
    competitions () {
      return this.$store.getters.loadedCompetitions
    }
  }
}
</script>
