import '@vue/runtime-core';
import 'vue-router';

import { Store } from 'vuex';

import { RootState } from '@/store';

declare module 'vue-router' {
	interface RouteMeta {
		// 是可选的
		title: string;
		// 每个路由都必须声明
		requireAuth: boolean;
	}
}

// Vuex 没有为 this.$store 属性提供开箱即用的类型声明。如果你要使用 TypeScript，首先需要声明自定义的模块补充
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$http: typeof fetch;
		// 为 `this.$store` 提供类型声明
		$store: Store<RootState>;
	}
}
