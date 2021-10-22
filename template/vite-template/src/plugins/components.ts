import Demo from '@/components/templates/Demo';

import { App } from 'vue';

export const registerComponents = (app: App<Element>) => {
	app.component('Demo', Demo);
};
