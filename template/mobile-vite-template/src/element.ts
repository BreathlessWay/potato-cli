import { Badge } from 'vant';

import { App } from 'vue';

const element = {
	install: (app: App<Element>): void => {
		app.component('Badge', Badge);
	},
};

export default element;
