<!-- src/components/TextEditor.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Editor de Texto</v-card-title>
        <v-textarea v-model="text" rows="15" outlined></v-textarea>
        <v-text-field v-model="fileName" label="Nombre del Archivo"></v-text-field>
        <v-btn @click="saveText">Guardar</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        text: '',
        fileName: '',
      };
    },
    methods: {
      async saveText() {
        await axios.post(
          '/api/files/create',
          { name: this.fileName, content: this.text },
          { headers: { 'user-id': 'user1' } }
        );
        alert('Texto guardado');
      },
    },
  };
  </script>
  