import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import request from '@/plugins/request';

const app = createApp(App);

// @ts-ignore
window.app = app;

app
  .use(store)
  .use(router)
  .use(request)
  .mount('#app');
