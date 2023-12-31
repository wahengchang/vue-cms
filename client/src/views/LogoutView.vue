<template>
  <div>logging out ...</div>
</template>

<script>
import store from '../store';
import axios from 'axios';

export default {
  mounted() {
    axios.post('/apis/logout').then(() => {
      // Clear the current user from Vuex store
      store.commit('setLogoutUser');

      // Redirect to the login page
      window.location.reload();
    });
  },
};
</script>
