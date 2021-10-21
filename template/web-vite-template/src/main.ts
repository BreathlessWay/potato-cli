import { createApp } from 'vue';
import App from '@/App.vue';

import router from '@/router';
import { store } from '@/store';
import element from '@/element';
import plugins from '@/plugins';

import { key } from '@/hooks/store';

createApp(App)
	.use(element)
	.use(plugins)
	.use(router)
	.use(store, key)
	.mount('#app');
