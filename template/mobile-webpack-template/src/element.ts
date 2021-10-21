import { Badge } from 'vant';

import { App } from 'vue';

const element = {
	install: (app: App<Element>, options: any) => {
		app.component('Badge', Badge);
	},
};

export default element;
