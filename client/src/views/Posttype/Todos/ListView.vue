<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="mb-2">
          <v-col>
            <h1>{{POSTYPE_NAME}} List</h1>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-btn @click="filterByCategory('')">All</v-btn>
          
          <v-btn v-for="category in categories"
            :key="category._id"
            @click="filterByCategory(category._id)"
            class="text-lowercase">
            {{ category.name }}
          </v-btn>
          
          <v-btn @click="addCategory" color="yellow" fab dark>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="removeCategory" color="yellow" fab dark>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-spacer></v-spacer> <!-- This spacer will push the "Create" button to the right -->

          <router-link :to="`/${API_PATH_SLUG}/create`">
            <v-btn @click="navigateToCreate" color="red" fab dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-row>
        <v-row class="mb-2">
          <v-data-table :headers="headers" :items="filteredPosttype">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="editPosttype(item._id)" icon color="blue">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deletePosttype(item._id)" icon color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-row>
        <v-row class="mb-2">
          <v-btn @click="toggleSortOrder()">Sort {{ sortAsc ? 'Descending' : 'Ascending' }}</v-btn>
        </v-row>
        <v-row>
          <v-btn @click="prevPage" :disabled="currentPage === 1">Previous</v-btn>
          <v-btn @click="nextPage" :disabled="currentPage === totalPages">Next</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import {POSTYPE_NAME, API_PATH_SLUG} from './const'
export default {
  data() {
    return {
      posttypes: [], 
      categories: [], 
      filteredPosttype: [], 
      sortField: '', 
      sortAsc: true, 
      currentPage: 1, 
      pageSize: 10, 
      POSTYPE_NAME,
      API_PATH_SLUG,
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
    filterByCategory(categoryId) {
      this.$router.push({
        path: `/${POSTYPE_NAME}`,
        query: {category: categoryId}
      });
    },
    sortTodos(field) {
      console.log('sortTodos field: ', field)
      const { filteredPosttype } = this
      console.log('sortTodos filteredPosttype: ', filteredPosttype)
      this.filteredPosttype = [...filteredPosttype.sort((a, b) => a[field] - b[field])]
    },
    toggleSortOrder() {
      this.sortAsc = !this.sortAsc;
      // Update the filteredPosttype array to reflect the updated sort order
    },
    editPosttype(posttypeId) {
      this.$router.push(`/${API_PATH_SLUG}/${posttypeId}`);
    },
    async deletePosttype(posttypeId) {
      await axios.delete(`/apis/${API_PATH_SLUG}/${posttypeId}`)
      window.location.reload();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
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

      await axios.post(`/apis/${API_PATH_SLUG}/category`, { name: categoryName} )
      window.location.reload();
    },
    async removeCategory () {
      const categoryName = prompt('Enter the category name:');
      if (!categoryName) return

      const confirmCreation = confirm(`Confirm delete of category "${categoryName}"?`);
      if (!confirmCreation) return

      await axios.delete(`/apis/${API_PATH_SLUG}/category', { data: { name: categoryName }`)
      window.location.reload();
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPosttype.length / this.pageSize);
    },
    pagination() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredPosttype.slice(startIndex, endIndex);
    }
  }
};
</script>