<!-- createView.vue -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <post-type-form
          form-title="Create {{ POSTYPE_NAME }}"
          submit-button-text="Create"
          :posttype="posttype"
          :categories="categories"
          :on-submit="createPosttype"
        ></post-type-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import PostTypeForm from './PosttypeForm.vue';
import { POSTYPE_NAME, API_PATH_SLUG } from './const';

export default {
  components: {
    PostTypeForm,
  },
  data() {
    return {
      POSTYPE_NAME,
      posttype: {
        title: '',
        description: '',
        category: '',
      },
      categories: [],
    };
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get(`/apis/${API_PATH_SLUG}/category/all`);
      this.categories = [...res.data.allCategory];
      this.posttype = {
        ...this.posttype,
        category: this.categories[0]._id,
      };
    },
    createPosttype(posttype) {
      axios.post(`/apis/${API_PATH_SLUG}`, posttype)
        .then(() => {
          this.$router.push(`/${API_PATH_SLUG}`);
        })
        .catch(error => {
          console.error('Error creating Posttype:', error);
        });
    },
  },
};
</script>
