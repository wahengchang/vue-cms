<!-- PostTypeForm.vue -->
<template>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col>
          <v-row class="mb-4">
            <v-col>
              <h1>{{ formTitle }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="innerPosttype.title" label="Title" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea v-model="innerPosttype.description" label="Description" required></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label for="category">Category:</label>
              <select id="category" v-model="innerPosttype.category" required style="border: 1px solid gray;padding: 0 20px;margin-left: 20px;">
                <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
              </select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" :color="submitButtonColor">{{ submitButtonText }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </template>
  
  <script>  
  export default {
    props: {
      formTitle: String,
      submitButtonText: String,
      submitButtonColor: {
        type: String,
        default: 'primary',
      },
      posttype: Object,
      categories: Array,
      onSubmit: Function,
    },
    data() {
        const innerPosttype = {...this.posttype}
        return {innerPosttype}
    },
    methods: {
      submitForm() {
        this.onSubmit(this.innerPosttype);
      },
    },
  };
  </script>
  