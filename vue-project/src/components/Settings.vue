<!-- src/components/Settings.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Configuración</v-card-title>
        <v-form>
          <v-switch v-model="settings.darkMode" label="Modo Oscuro"></v-switch>
          <v-btn @click="saveSettings" color="primary">Guardar Cambios</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        settings: {
          darkMode: false, // Estado inicial de darkMode
        },
      };
    },
    async created() {
      try {
        // Cargar configuración desde la API
        const response = await axios.get('/api/settings');
        this.settings = response.data; // Asignar la respuesta de la API al modelo
      } catch (error) {
        console.error('Error al cargar la configuración', error);
      }
    },
    methods: {
      async saveSettings() {
        try {
          // Guardar configuración a través de la API
          await axios.post('/api/settings', this.settings);
          alert('Configuración guardada');
        } catch (error) {
          console.error('Error al guardar la configuración', error);
          alert('Error al guardar la configuración');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  