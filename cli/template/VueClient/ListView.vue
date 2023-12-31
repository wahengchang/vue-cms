<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="mb-2">
          <v-col>
            <h1>{{ POSTYPE_NAME }} List</h1>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-toolbar>
          <template v-slot:prepend>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact"
              single-line flat hide-details variant="solo-filled" label="Category" class="pa-2" style="width: 200px;"></v-text-field>
            <v-btn icon="mdi-plus" size="x-small" class="ms-5" @click="addCategory"></v-btn>
            <v-btn icon="mdi-minus" size="x-small" @click="removeCategory"></v-btn>
          </template>
          <csv-upload :urlApi="`/apis/${API_PATH_SLUG}/upload-csv`"/>

          <router-link :to="`/${API_PATH_SLUG}/create`">
            <v-btn @click="navigateToCreate" color="" fab dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-toolbar>
        </v-row>
        <v-row class="mb-2">
          <v-data-table v-model:sort-by="sortBy" v-model:page="page" v-model:search="search" :headers="headers"
            :items="filteredPosttype" :items-per-page="pageSize">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="editPosttype(item._id)" variant="text"  color="blue">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deletePosttype(item._id)" variant="text"  color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>


            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { POSTYPE_NAME, API_PATH_SLUG } from './const'
import CsvUpload from '../../../components/CsvUpload.vue';

export default {
  components: {
    CsvUpload,
  },
  data() {
    return {
      search: '',
      posttypes: [],
      categories: [],
      filteredPosttype: [],
      pageSize: 10,
      page: 1,
      POSTYPE_NAME,
      API_PATH_SLUG,
      sortBy: [{ key: 'createdAt', order: 'desc' }],
      headers: [
        { title: 'Title', key: 'title' },
        { title: 'Category', key: 'category.value' },
        { title: 'Created Time', key: 'createdAt' },
        { title: 'Action', key: 'actions' },
        // { title: '', value: 'actions', sortable: false },
      ],
    };
  },
  async created() {
    await this.fetchCategories();
    await this.fetchPosttypes();
  },
  methods: {
    async fetchPosttypes() {
      const res = await axios.get(`/apis/${API_PATH_SLUG}`)
      this.posttypes = [...res.data[`${POSTYPE_NAME}s`]]
      const _filteredPosttype = [...this.posttypes]
      this.filteredPosttype = _filteredPosttype.map(item => {
        const { _id, title, category, createdAt } = item
        const _category = {
          id: category,
          value: this.getCategoryName(category)
        }
        return {
          _id,
          title,
          category: _category,
          createdAt: this.formatDate(createdAt)
        }
      })
    },
    async fetchCategories() {
      const res = await axios.get(`/apis/${API_PATH_SLUG}/category/all`)
      this.categories = [...res.data.allCategory]
    },
    editPosttype(posttypeId) {
      this.$router.push(`/${API_PATH_SLUG}/${posttypeId}`);
    },
    async deletePosttype(posttypeId) {
      await axios.delete(`/apis/${API_PATH_SLUG}/${posttypeId}`)
      window.location.reload();
    },
    formatDate(_date) {
      const date = new Date(_date)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat._id === categoryId);
      return category ? category.name : 'Unknown';
    },
    async addCategory() {
      const categoryName = prompt('Enter the category name:');
      if (!categoryName) return

      const confirmCreation = confirm(`Confirm creation of category "${categoryName}"?`);
      if (!confirmCreation) return

      await axios.post(`/apis/${API_PATH_SLUG}/category`, { name: categoryName })
      window.location.reload();
    },
    async removeCategory() {
      const categoryName = prompt('Enter the category name:');
      if (!categoryName) return

      const confirmCreation = confirm(`Confirm delete of category "${categoryName}"?`);
      if (!confirmCreation) return

      await axios.delete(`/apis/${API_PATH_SLUG}/category', { data: { name: categoryName }`)
      window.location.reload();
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.posttypes.length / this.pageSize)
    },
    categoryOptions() {
      if (!this.categories || !this.categories.length) return []

      return this.categories.map(category => ({
        value: category._id,
        title: category.name,
      }));
    },
  }
};
</script>