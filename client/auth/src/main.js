import 'primeicons/primeicons.css';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';

import App from './App.vue';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import router from './router';

const app = createApp(App);
console.log('aaaa');
app
  .use(PrimeVue)
  .use(router)
  .mount('#app');
