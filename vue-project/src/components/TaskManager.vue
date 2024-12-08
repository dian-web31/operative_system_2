<!-- src/components/TaskManager.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Administrador de Tareas</v-card-title>
        <v-list>
          <v-list-item
            v-for="task in tasks"
            :key="task.name"
          >
            <v-list-item-content>{{ task.name }}</v-list-item-content>
            <v-btn color="blue" @click="startTask(task.name)">Iniciar</v-btn>
            <v-btn color="red" @click="endTask(task.name)">Cerrar</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [
          { name: 'Calculadora' },
          { name: 'Editor de Texto' },
          { name: 'Visor de Imágenes' },
          // Agrega más aplicaciones si es necesario
        ],
      };
    },
    methods: {
      // Método para iniciar una aplicación
      startTask(taskName) {
        alert(`Aplicación "${taskName}" iniciada`);
        this.reportTaskUsage(taskName); // Reportar uso de la aplicación
      },
      // Método para cerrar una aplicación
      endTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
        alert(`Tarea "${taskName}" cerrada`);
      },
      // Método para reportar el uso de una aplicación
      async reportTaskUsage(taskName) {
        try {
          // Realiza una solicitud a la API para registrar el uso (opcional, depende de tu implementación)
          await this.$axios.post('/api/report-usage', { taskName, timestamp: new Date() });
          console.log(`Uso de la aplicación "${taskName}" registrado en el sistema.`);
        } catch (error) {
          console.error('Error al registrar el uso de la aplicación:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  