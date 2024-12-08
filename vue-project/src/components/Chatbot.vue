<!-- src/components/Chatbot.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Chatbot</v-card-title>
        <v-text-field v-model="message" label="Tu mensaje"></v-text-field>
        <v-btn @click="sendMessage">Enviar</v-btn>
        <div v-for="msg in messages" :key="msg">{{ msg }}</div>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        message: '',
        messages: [],
      };
    },
    methods: {
      async sendMessage() {
        const response = await axios.post('http://localhost:5000/api/chat', { message: this.message });
        this.messages.push(response.data.reply);
      },
    },
  };
  </script>
  