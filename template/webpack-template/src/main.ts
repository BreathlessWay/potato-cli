import { createApp } from 'vue';

import axiosRegister from '@/utils/axios-register';

import App from '@/App.vue';

import router from '@/router';
import store from '@/store';
import plugins from '@/plugins';
import element from '@/element';

import { key } from '@/hooks/store';

axiosRegister();

const app = createApp(App)
	.use(store, key)
	.use(router)
	.use(plugins)
	.use(element);

app.mount('#app');
