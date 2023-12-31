<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center">Login</h2>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    submitForm() {
      axios
        .post('/apis/login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          location.reload(); // Reload the page upon successful login
        })
        .catch(error => {
          this.errorMessage = error.response.data.message;
        });
    },
  },
  mounted() {
    // Check if the user is already logged in when the component is mounted
  },
};
</script>

<style>
.error-message {
  color: red;
}
</style>
