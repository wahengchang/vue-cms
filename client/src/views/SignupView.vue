<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center">Signup</h2>
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

          <v-btn color="primary" type="submit">Signup</v-btn>
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
        .post('/apis/signup', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          this.errorMessage = error.response.data.message;
        });
    }
  }
};
</script>

<style>
.error-message {
  color: red;
}
</style>
