<template>
    <v-container>
      <v-card>
        <v-card-title>Iniciar sesión</v-card-title>
        <v-form @submit.prevent="submitLogin">
          <v-text-field
            v-model="username"
            label="Usuario"
            :rules="[v => !!v || 'El nombre de usuario es requerido']"
          />
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="[v => !!v || 'La contraseña es requerida']"
          />
          <v-select
            v-model="role"
            :items="roles"
            label="Rol"
          />
          <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        role: 'usuario',
        roles: ['admin', 'usuario'],
      };
    },
    methods: {
      submitLogin() {
        if (!this.username || !this.password) {
          return this.$toast.error('Por favor, complete todos los campos');
        }
        this.$router.push('/desktop');
      },
    },
  };
  </script>
  