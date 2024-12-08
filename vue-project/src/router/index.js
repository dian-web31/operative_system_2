// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Desktop from '../views/Desktop.vue';
import Home from '../views/Home.vue';
import Settings from '../components/Settings.vue';
import Calculator from '../components/Calculator.vue';
import ChatBot from '../components/Chatbot.vue';
import File from '../components/FileManager.vue';
import Game from '../components/Game.vue';
import Web from '../components/WebBrowser.vue';
import ajustes from '../components/Settings.vue';
import task from '../components/TaskManager.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/desktop', component: Desktop },
  { path: '/home', component: Home },
  { path: '/settings', component: Settings },
  { path: '/apps/Calculadora', component: Calculator },
  { path: '/apps/ChatBot', component: ChatBot },
  { path: '/apps/File System', component: File },
  { path: '/apps/Videojuego', component: Game },
  { path: '/apps/Navegador Web', component: Web },
  { path: '/apps/Ajustes', component: ajustes },
  { path: '/apps/Administrador', component: task },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
