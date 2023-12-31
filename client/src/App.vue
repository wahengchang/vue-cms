<template>
  <v-app>

    <nav>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <div>
        <router-link
          to="/signup"
          :disabled="isLoggedIn"
          v-bind:class="{ 'disabled-link': isLoggedIn }"
        >Signup</router-link> |
        <router-link
          to="/login"
          :disabled="isLoggedIn"
          v-bind:class="{ 'disabled-link': isLoggedIn }"
        >Login</router-link> |
        <router-link
          to="/logout"
          :disabled="!isLoggedIn"
          v-bind:class="{ 'disabled-link': !isLoggedIn }"
        >Logout</router-link> |
        <router-link
          to="/me"
          :disabled="!isLoggedIn"
          v-bind:class="{ 'disabled-link': !isLoggedIn }"
        >Me</router-link>
      </div>

      <div>
        <router-link
          to="/todos"
          :disabled="!isLoggedIn"
          v-bind:class="{ 'disabled-link': !isLoggedIn }"
        >Todo List</router-link>|
        <router-link
          to="/todos/create"
          :disabled="!isLoggedIn"
          v-bind:class="{ 'disabled-link': !isLoggedIn }"
        >Todo Create</router-link>
      </div>
    </nav>
    <component :is="$route.meta.layout || DefaultLayout">
      <router-view/>
    </component>
  </v-app>

</template>

<style>
</style>

<script>
import store from './store';
import DefaultLayout from './layouts/DefaultLayout.vue'

export default {
  data: () => {
    return {
      DefaultLayout
    }
  },
  computed: {
    isLoggedIn() {
      return  store.getters.currentUser ? true : false
    },
  }
};
</script>