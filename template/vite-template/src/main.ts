import '@/utils/axios-helper';

import { createApp } from 'vue';

import App from '@/App.vue';

import router from '@/router';
import store from '@/store';
import plugins from '@/plugins';
import element from '@/element';

const app = createApp(App)
	.use(store)
	.use(router)
	.use(plugins)
	.use(element);

app.mount('#app');
