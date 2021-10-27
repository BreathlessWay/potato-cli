import { createApp } from 'vue';

import axiosRegister from '@/utils/axios-register';

import App from '@/App.vue';

import router from '@/router';
import store from '@/store';
import plugins from '@/plugins';
import element from '@/element';

axiosRegister();

const app = createApp(App)
	.use(store)
	.use(router)
	.use(plugins)
	.use(element);

app.mount('#app');
