import Demo from '@/components/templates/Demo';

import { App } from 'vue';

export const registerComponents = (app: App<Element>): void => {
	app.component('Demo', Demo);
};
