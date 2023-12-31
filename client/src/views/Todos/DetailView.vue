<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="editTodo">
          <v-row>
            <v-col>
              <v-row class="mb-4">
                <v-col>
                  <h1>Edit Todo</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="todo.title" label="Title" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea v-model="todo.description" label="Description" required></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                <label for="category">Category:</label>
                <select id="category" v-model="todo.category" required style="border: 1px solid gray;padding: 0 20px;margin-left: 20px;">
                  <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                </select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn type="submit" color="primary">Update</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todo: {
        title: '',
        description: '',
        category: ''
      },
      categories: []
    };
  },
  async created() {
    const { id } = this.$route.params
    await this.fetchCategories();
    await this.fetchTodo(id);
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get('/apis/todos/category/all')
      this.categories = [...res.data.allCategory]
    },
    async fetchTodo(id) {
      const res = await axios.get(`/apis/todos/${id}`)
      const { title, description, category } = res.data.Todo
      this.todo = { title, description, category }
    },
    async editTodo() {
      const { id } = this.$route.params

      axios.put(`/apis/todos/${id}`, this.todo)
        .then(() => {
          this.$router.push('/todos');
        })
        .catch(error => {
          console.error('Error creating todo:', error);
        });
    }
  }
};
</script>