<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="mb-2">
          <v-col>
            <h1>Todos List</h1>
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

          <router-link to="/todos/create">
            <v-btn @click="navigateToCreate" color="red" fab dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-row>
        <v-row class="mb-2">
          <v-data-table :headers="headers" :items="filteredTodos">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="editTodo(item._id)" icon color="blue">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteTodo(item._id)" icon color="red">
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
export default {
  data() {
    return {
      todos: [], // Array to store all todos
      categories: [], // Array to store categories
      filteredTodos: [], // Array to store filtered todos
      sortField: '', // Field to sort todos by
      sortAsc: true, // Sort order (ascending/descending)
      currentPage: 1, // Current page number
      pageSize: 10, // Number of todos per page

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
    await this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      const res = await axios.get('/apis/todos')
      this.todos = [...res.data.Todos]
      const _filteredTodos = [...this.todos]
      this.filteredTodos = _filteredTodos.map(item => {
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
      const res = await axios.get('/apis/todos/category/all')
      this.categories = [...res.data.allCategory]
    },
    filterByCategory(categoryId) {
      console.log('-=-=-=-= categoryId: ', categoryId)
      this.$router.push({
        path: `/todos`,
        query: {category: categoryId}
      });
    },
    sortTodos(field) {
      console.log('sortTodos field: ', field)
      const { filteredTodos } = this

      console.log('sortTodos filteredTodos: ', filteredTodos)


      this.filteredTodos = [...filteredTodos.sort((a, b) => a[field] - b[field])]
      // Sort todos by the given field
      // Update the sortField and sortAsc variables
      // Update the filteredTodos array to reflect the sorting
    },
    toggleSortOrder() {
      this.sortAsc = !this.sortAsc;
      // Update the filteredTodos array to reflect the updated sort order
    },
    editTodo(todoId) {
      this.$router.push(`/todos/${todoId}`);
    },
    async deleteTodo(todoId) {
      await axios.delete(`/apis/todos/${todoId}`)
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

      await axios.post('/apis/todos/category', { name: categoryName })
      window.location.reload();
    },
    async removeCategory () {
      const categoryName = prompt('Enter the category name:');
      if (!categoryName) return

      const confirmCreation = confirm(`Confirm delete of category "${categoryName}"?`);
      if (!confirmCreation) return

      await axios.delete('/apis/todos/category', { data: { name: categoryName }})
      window.location.reload();
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTodos.length / this.pageSize);
    },
    paginatedTodos() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredTodos.slice(startIndex, endIndex);
    }
  }
};
</script>