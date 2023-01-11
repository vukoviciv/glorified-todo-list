import 'primeicons/primeicons.css';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';

import App from './App.vue';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app
  .use(PrimeVue)
  .mount('#app');
