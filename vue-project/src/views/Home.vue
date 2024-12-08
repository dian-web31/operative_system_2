<!-- src/views/Home.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Área de Trabajo</v-card-title>
  
        <!-- Solo admins tienen acceso al Administrador de Archivos -->
        <v-btn v-if="userRole === 'admin'" @click="openFileManager">Abrir Administrador de Archivos</v-btn>
  
        <!-- Solo editors pueden acceder a la configuración -->
        <v-btn v-if="userRole === 'editor' || userRole === 'admin'" @click="openSettings">Abrir Configuración</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userRole: localStorage.getItem('user-role') // Obtiene el rol desde el localStorage
      };
    },
    methods: {
      openFileManager() {
        this.$router.push('/apps/File System');
      },
      openSettings() {
        this.$router.push('/settings');
      }
    }
  };
  </script>
  