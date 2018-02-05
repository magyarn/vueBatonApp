<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" fixed temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userIsAuthenticated">
            <v-list-tile-action
              @click="onLogout"
            ></v-list-tile-action>
            <v-list-tile-content>Logout</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon
        @click="sideNav =!sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">
          ScoreSheet
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
         {{item.title}}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
            Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItemList = [
          {
            title: 'View Competitions',
            path: '/competitions'
          },
          {
            title: 'Sign Up',
            path: '/signup'
          },
          {
            title: 'Sign In',
            path: '/signin'
          }
        ]
        if (this.userIsAuthenticated) {
          menuItemList = [
            {
              title: 'View Competitions',
              path: '/competitions'
            },
            {
              title: 'Athletes',
              path: '/athletes'
            },
            {
              title: 'Create Competition',
              path: '/competition/new'
            },
            {
              title: 'My Profile',
              path: '/profile'
            }
          ]
        }
        return menuItemList
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
