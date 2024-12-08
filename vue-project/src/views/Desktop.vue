<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col
          v-for="(app, index) in apps"
          :key="index"
          cols="3"
          sm="2"
          md="1.5"
          class="d-flex justify-center"
        >
          <v-card @click="openApp(app.name)" class="app-card" elevation="3">
            <v-img
              :src="app.icon"
              height="120"
              contain
              class="app-icon"
            ></v-img>
            <v-card-title class="text-center">{{ app.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apps: [
          { name: 'Calculadora', icon: '/src/components/icons/calculator.png' },
          { name: 'File System', icon: '/src/components/icons/files.png' },
          { name: 'Videojuego', icon: '/src/components/icons/game.png' },
          { name: 'Navegador Web', icon: '/src/components/icons/browser.png' },
          { name: 'Chatbot', icon: '/src/components/icons/chatbot.png' },
          { name: 'Ajustes', icon: '/src/components/icons/settings.png' },
          { name: 'Administrador', icon: '/src/components/icons/administrador.png' },
        ],
      };
    },
    methods: {
      openApp(appName) {
        this.$router.push(`/apps/${appName}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .app-card {
    cursor: pointer;
    text-align: center;
    width: 100%;
  }
  
  .app-icon {
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  .app-card:hover .app-icon {
    transform: scale(1.1);
  }
  
  .v-card-title {
    font-weight: bold;
    text-align: center;
    padding: 10px;
  }
  </style>
  