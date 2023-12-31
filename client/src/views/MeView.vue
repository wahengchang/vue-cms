<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="mb-2">
          <v-col>
            <h1>Welcome, {{ username }}!</h1>
            <p>Your ID: {{ id }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '../store';

export default {
  mounted() {
  },
  computed: {
    username() {
      return store.getters.currentUser ? store.getters.currentUser.username : '';
    },

    id() {
      return store.getters.currentUser ? store.getters.currentUser._id : '';
    },
  },
};
</script>
