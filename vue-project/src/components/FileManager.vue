<template>
    <v-container>
      <v-card>
        <v-card-title class="text-center">Gestión de Archivos</v-card-title>
        <v-card-subtitle class="text-center mb-3">
          Carga, visualiza y gestiona tus archivos fácilmente.
        </v-card-subtitle>
  
        <!-- Botón para cargar archivos -->
        <v-btn @click="loadFiles" class="mb-3" color="primary">Cargar Archivos</v-btn>
  
        <!-- Lista de Archivos -->
        <v-list dense>
          <v-list-item
            v-for="file in files"
            :key="file"
            @dblclick="openFile(file)"
            class="file-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ file }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <!-- Contenedor dinámico para manejar contenido de archivos -->
        <div v-if="selectedFile" class="mt-5">
          <h3 class="text-center">Archivo: {{ selectedFile }}</h3>
  
          <!-- Área dinámica según el tipo de archivo -->
          <div v-if="isTextFile(selectedFile)">
            <v-textarea
              v-model="fileContent"
              label="Contenido del archivo"
              rows="15"
              outlined
            ></v-textarea>
            <v-btn @click="saveFile" class="mt-3" color="success">Guardar</v-btn>
          </div>
  
          <audio
            v-if="isAudioFile(selectedFile)"
            :src="fileContent"
            controls
            class="audio-player mt-3"
          ></audio>
  
          <div v-if="isMediaFile(selectedFile)" class="media-viewer mt-3">
            <img
              v-if="isImage(selectedFile)"
              :src="fileContent"
              class="media-image"
            />
            <video
              v-else
              :src="fileContent"
              controls
              class="media-video"
            ></video>
          </div>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        files: [],
        fileContent: "",
        selectedFile: null,
      };
    },
    methods: {
      // Cargar la lista de archivos
      async loadFiles() {
        try {
          const response = await axios.get("/api/files/list", {
            headers: { "user-id": "user1" },
          });
          this.files = response.data.files;
        } catch (error) {
          console.error("Error al cargar archivos:", error);
          alert("No se pudieron cargar los archivos.");
        }
      },
  
      // Abrir un archivo (doble clic)
      async openFile(file) {
        this.selectedFile = file;
        try {
          if (this.isTextFile(file)) {
            const response = await axios.get(`/api/files/read/${file}`, {
              headers: { "user-id": "user1" },
            });
            this.fileContent = response.data.content;
          } else if (this.isAudioFile(file) || this.isMediaFile(file)) {
            const response = await axios.get(`/api/files/read/${file}`, {
              headers: { "user-id": "user1" },
              responseType: "blob",
            });
            this.fileContent = URL.createObjectURL(response.data);
          }
        } catch (error) {
          console.error("Error al abrir el archivo:", error);
          alert("No se pudo abrir el archivo.");
        }
      },
  
      // Guardar cambios en un archivo de texto
      async saveFile() {
        try {
          await axios.post(
            "/api/files/create",
            { name: this.selectedFile, content: this.fileContent },
            { headers: { "user-id": "user1" } }
          );
          alert("Archivo guardado exitosamente.");
        } catch (error) {
          console.error("Error al guardar archivo:", error);
          alert("No se pudo guardar el archivo.");
        }
      },
  
      // Métodos para determinar tipo de archivo
      isTextFile(file) {
        return file.match(/\.(txt|md|json|csv)$/i);
      },
      isAudioFile(file) {
        return file.match(/\.(mp3|wav|ogg)$/i);
      },
      isMediaFile(file) {
        return file.match(/\.(jpeg|jpg|png|gif|mp4|webm|avi)$/i);
      },
      isImage(file) {
        return file.match(/\.(jpeg|jpg|png|gif)$/i);
      },
    },
  };
  </script>
  
  <style scoped>
  .file-item {
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .file-item:hover {
    background-color: #e3f2fd;
  }
  .audio-player {
    width: 100%;
  }
  .media-viewer {
    text-align: center;
  }
  .media-image {
    max-width: 100%;
    max-height: 400px;
  }
  .media-video {
    max-width: 100%;
    max-height: 400px;
  }
  </style>
  