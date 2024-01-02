<template>
    <v-container>
      <v-row>
        <v-col>
          <input type="file" ref="fileInput" @change="handleFileChange" />
          <v-btn @click="uploadFile">Upload CSV</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      urlApi: String,
    },
    methods: {
      handleFileChange() {
        this.file = this.$refs.fileInput.files[0];
      },
      uploadFile() {
        const formData = new FormData();
        formData.append('file', this.file);
  
        axios.post(this.urlApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data); // Handle success response
          window.location.reload();
        })
        .catch(error => {
          console.error(error); // Handle error
        });
      },
    },
    data() {
      return {
        file: null,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  