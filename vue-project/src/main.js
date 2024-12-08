// src/main.js
import 'vuetify/styles'; // Importa los estilos de Vuetify
import { VApp, VContainer, VBtn, VCard, VCardTitle, VForm, VTextField, VSelect, VRow, VCol, VImg, VTextarea, VList, VListItem, VListItemTitle,VAlert, } from 'vuetify/components'; // Elimina VListItemContent
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createVuetify } from 'vuetify'; // Importa Vuetify

// Crea una instancia de Vuetify y registra los componentes explícitamente
const vuetify = createVuetify({
  components: {
    VApp,
    VContainer,
    VBtn,
    VCard,
    VCardTitle,
    VForm,
    VTextField,
    VSelect,
    VRow,
    VCol,
    VImg,
    VTextarea,
    VList,
    VListItem,
    VListItemTitle, // Mantén solo los componentes válidos
    VAlert,
  },
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');
