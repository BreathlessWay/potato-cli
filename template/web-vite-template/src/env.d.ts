/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
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

declare interface ImportMetaEnv {
	VITE_APP_BUILD_DATE: string;
	VITE_APP_ENV: string;
	VITE_APP_BASE_URL: boolean;
}
