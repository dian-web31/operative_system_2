<!-- src/components/WebBrowser.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Navegador Web</v-card-title>
        <v-text-field
          v-model="url"
          label="URL"
          placeholder="Ingresa una URL"
          @keyup.enter="loadPage"
        ></v-text-field>
        <v-btn @click="loadPage" color="primary">Ir</v-btn>
        <iframe
          v-if="url && isUrlValid"
          :src="formattedUrl"
          style="width: 100%; height: 80vh; border: none;"
          frameborder="0"
        ></iframe>
        <v-alert v-if="!isUrlValid && url" type="error" border="left" color="red">
          URL no válida. Por favor, ingrese una URL completa y válida.
        </v-alert>
        <v-alert v-if="url && !isUrlValidYoutube" type="error" border="left" color="red">
          Este sitio no se puede mostrar en un iframe debido a restricciones de seguridad.
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        url: '', // Almacena la URL ingresada por el usuario
      };
    },
    computed: {
      // Agrega "http://" si la URL no lo tiene y valida si la URL está correctamente formada
      formattedUrl() {
        return this.url.startsWith('http://') || this.url.startsWith('https://')
          ? this.url
          : `https://${this.url}`;
      },
      // Verifica si la URL parece válida (solo una verificación básica)
      isUrlValid() {
        const urlPattern = /^(https?:\/\/)/;
        return urlPattern.test(this.url);
      },
      // Verifica si la URL corresponde a un sitio que no se puede cargar en un iframe (por ejemplo, YouTube)
      isUrlValidYoutube() {
        const blockedSites = ['youtube.com', 'vimeo.com'];
        return !blockedSites.some((site) => this.url.includes(site));
      },
    },
    methods: {
      loadPage() {
        if (this.isUrlValid && this.url) {
          // Si la URL es válida, solo carga la página
          return;
        } else {
          alert('Por favor, ingresa una URL válida (ej. https://www.ejemplo.com)');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo para que el iframe ocupe toda el área disponible */
  iframe {
    display: block;
    margin-top: 20px;
    width: 100%;
    height: 70vh;
    border: none;
  }
  </style>
  