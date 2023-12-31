<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="createTodo">
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
                  <v-btn type="submit" color="primary">Create</v-btn>
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
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get('/apis/todos/category/all')
      this.categories = [...res.data.allCategory]
      this.todo = {
        ...this.todo,
        category: this.categories[0]._id
      }
    },
    async createTodo() {
      axios.post('/apis/todos', this.todo)
      .then(() => {
        // console.log('Todo created:', response.data);
        this.$router.push('/todos');
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
    }
  }
};
</script>