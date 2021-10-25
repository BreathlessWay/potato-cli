import '@vue/runtime-core';
import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		// 是可选的
		title: string;
		// 每个路由都必须声明
		requireAuth: boolean;
	}
}

// 需要声明自定义的模块补充
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$http: typeof fetch;
	}
}
