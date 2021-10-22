import { Badge } from 'vant';

import { App } from 'vue';

const element = {
	install: (app: App<Element>) => {
		app.component('MuiBadge', Badge);
	},
};

export default element;
