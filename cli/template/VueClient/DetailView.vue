<!-- editView.vue -->
<template>
  <v-container>
    <v-row v-if="status">
      <v-col>
        <post-type-form
          :form-title="`Edit ${POSTYPE_NAME}`"
          submit-button-text="Update"
          :posttype="posttype"
          :categories="categories"
          :on-submit="editPosttype"
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
      status: false,
    };
  },
  async created() {
    this.status = false;
    const { id } = this.$route.params;
    await this.fetchCategories();
    await this.fetchPosttype(id);
    this.status = true;
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get(`/apis/${API_PATH_SLUG}/category/all`);
      this.categories = [...res.data.allCategory];
    },
    async fetchPosttype(id) {
      const res = await axios.get(`/apis/${API_PATH_SLUG}/${id}`);
      const { title, description, category } = res.data[POSTYPE_NAME];
      this.posttype = { title, description, category };
    },
    async editPosttype(updatedPosttype) {
      const { id } = this.$route.params

      axios.put(`/apis/${API_PATH_SLUG}/${id}`, updatedPosttype)
        .then(() => {
          this.$router.push(`/${API_PATH_SLUG}`);
        })
        .catch(error => {
          console.error('Error creating Posttype:', error);
        });
    }
  }
};
</script>