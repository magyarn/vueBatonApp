<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12 sm6>
                    <v-text-field 
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 class="ml-4">
                    <v-text-field 
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field 
                    name="birthday"
                    label="Date of Birth"
                    id="birthday"
                    v-model="birthday"
                    type="date"
                    required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field 
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field 
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field 
                    name="confirmedPassword"
                    label="Confirm Password"
                    id="confirmedPassword"
                    v-model="confirmedPassword"
                    type="confirmedPassword"
                    :rules="[passwordsMatch]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn 
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                      >
                      Sign Up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>refresh</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        password: '',
        confirmedPassword: ''
      }
    },
    computed: {
      passwordsMatch () {
        return this.password !== this.confirmedPassword ? 'Oops! Your passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignUp () {
        // Vuex
        const newUser = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday
        }
        this.$store.dispatch('signUserUp', newUser)
      },
      onDismissed () {
        console.log('Dismissed Alert')
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
