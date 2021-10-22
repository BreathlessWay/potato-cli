declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, Vue, any>;
	export default component;
}

// scss模块声明
declare module '*.module.scss' {
	const content: { [key: string]: any };
	export = content;
}
// less模块声明
declare module '*.module.less' {
	const content: { [key: string]: any };
	export default content;
}
// css模块声明
declare module '*.module.css' {
	const content: { [key: string]: any };
	export = content;
}

interface Window {
}

declare namespace NodeJS {
	interface ProcessEnv {
		VUE_APP_BUILD_DATE: string;
		VUE_APP_ENV: string;
		VUE_APP_BASE_URL: string;
	}
}
