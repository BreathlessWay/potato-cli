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

app.config.errorHandler = (err, vm, info) => {
	// 运行框架错误收集点
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	console.group(
		`%cVue运行错误`,
		'color: red; background: #e3e3e3; padding: 3px 5px; border-radius: 5px;'
	);
	console.info(err);
	console.info(vm);
	console.info(info);
	console.groupEnd();
};

app.mount('#app');
