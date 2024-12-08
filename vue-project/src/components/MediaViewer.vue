<!-- src/components/MediaViewer.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Visor de Imágenes y Video</v-card-title>
        <input type="file" @change="uploadFile" />
        <div v-for="file in mediaFiles" :key="file">
          <img v-if="isImage(file)" :src="file" />
          <video v-else controls :src="file"></video>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        mediaFiles: [],
      };
    },
    methods: {
      async uploadFile(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/media/upload', formData);
        this.mediaFiles.push(response.data.path);
      },
      isImage(file) {
        return file.match(/\.(jpeg|jpg|png|gif)$/);
      },
    },
  };
  </script>
  