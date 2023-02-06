import 'primeicons/primeicons.css';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';

import App from './App.vue';
import ConfirmationService from 'primevue/confirmationservice';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import router from './router';

const app = createApp(App);
app
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(router)
  .mount('#app');
