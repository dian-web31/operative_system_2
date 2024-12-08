<!-- src/views/Register.vue -->
<template>
    <v-form @submit.prevent="register">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-select v-model="role" :items="roles" label="Select Role" required></v-select>
      <v-btn type="submit">Registrar</v-btn>
    </v-form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        role: 'viewer',
        roles: ['admin', 'editor', 'viewer'],
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('/api/auth/register', {
            username: this.username,
            password: this.password,
            role: this.role
          });
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
        }
      }
    }
  };
  </script>
  