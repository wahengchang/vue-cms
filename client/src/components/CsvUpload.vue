<template>
  <div>
    <v-btn color="primary" prepend-icon="mdi-file" variant="tonal" @click="handleFileImport">
      Upload Csv
    </v-btn>

    <input ref="fileInput" class="d-none" type="file" @change="handleFileChange">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    urlApi: String,
  },
  methods: {
    handleFileImport() {
      this.isSelecting = true;

      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true });

      this.$refs.fileInput.click();
    },
    // onFileChanged(e) {
    //   this.selectedFile = e.target.files[0];
    // },
    handleFileChange() {
      this.file = this.$refs.fileInput.files[0];

      if (this.file) {
        const confirmUpload = confirm('Are you sure you want to upload the CSV file?');

        if (confirmUpload) {

          this.uploadFile();
        }
      } else {
        alert('Please select a file before uploading.');
      }

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
