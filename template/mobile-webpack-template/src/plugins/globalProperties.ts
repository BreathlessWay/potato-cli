import { App } from 'vue';

export const registerGlobalProperties = (app: App<Element>) => {
	app.config.globalProperties.$http = fetch;
};
