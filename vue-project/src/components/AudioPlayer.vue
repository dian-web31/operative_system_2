<!-- src/components/AudioPlayer.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Reproductor de Música</v-card-title>
        <input type="file" @change="loadMusic" />
        <audio ref="audio" controls></audio>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      loadMusic(event) {
        const file = event.target.files[0];
        this.$refs.audio.src = URL.createObjectURL(file);
      },
    },
  };
  </script>
  