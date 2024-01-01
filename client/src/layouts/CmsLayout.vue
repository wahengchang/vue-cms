<template>
    <v-app>
      <!-- Top Navigation -->
      <v-app-bar app color="primary">
        <v-app-bar-title>
          <img src="/path/to/logo.png" alt="Logo" class="logo">
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/me">
          <v-btn color="white">{{ username }}</v-btn>
        </router-link>
        <router-link to="/logout">
          <v-btn color="error">Logout</v-btn>
        </router-link>
      </v-app-bar>
  
      <!-- Left Navigation -->
      <v-navigation-drawer app permanent>
        <v-list dense>
          <v-list-item v-for="posttype in cmsMenu" :key="posttype.name" @click="navigateTo(posttype.path)">
            <v-list-item-title>{{ posttype.name }}</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item @click="navigateTo('fooList')">
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import store from '../store';
  import cmsMenu from '../views/Posttype/cmsMenu'
  
  export default {
    data: () => {
      return {
        cmsMenu
      }
    },  
    computed: {
      username() {
        return store.getters.currentUser ? store.getters.currentUser.username : '';
      },
    },
    methods: {
      logout() {
        this.$router.push(`/logout`);
      },
      navigateTo(path) {
        // Implement navigation to different views based on the left navigation items.
        // You can use Vue Router for this purpose.
        this.$router.push(path);
      },
    },
  };
  </script>
  
  <style>
  .logo {
    max-height: 40px;
  }
  </style>
  