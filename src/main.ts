import { createApp } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMatomo from 'vue-matomo';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import i18n from './i18n';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Notifications from '@kyvg/vue3-notification';
import './styles/index.css';

import matomo from './matomo';
import { router } from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(i18n);
app.use(pinia);
app.use(router);
app.use(VueMatomo, matomo);
app.use(Notifications);
app.use(VueAxios, axios);
app.mount('#app');
