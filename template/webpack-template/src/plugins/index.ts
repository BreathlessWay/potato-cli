import { registerComponents } from '@/plugins/components';
import { registerDirectives } from '@/plugins/directives';
import { registerGlobalProperties } from '@/plugins/globalProperties';

import { App } from 'vue';

const plugins = {
	install: (app: App<Element>) => {
		registerComponents(app);
		registerDirectives(app);
		registerGlobalProperties(app);
	},
};

export default plugins;
