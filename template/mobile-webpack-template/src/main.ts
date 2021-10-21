import { createApp } from 'vue';

import App from '@/App.vue';

import router from '@/router';
import { store } from '@/store';
import plugins from '@/plugins';
import element from '@/element';

import { key } from '@/hooks/store';

console.log('zhugeKeys');

const app = createApp(App);

app.use(store, key).use(router).use(plugins).use(element).mount('#app');
