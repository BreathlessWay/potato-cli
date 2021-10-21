import { defineComponent } from 'vue';

import Style from './style.module.less';

export default defineComponent({
	name: 'Card',

	props: {
		title: {
			type: String,
			default: 'card',
		},
	},

	setup(props) {
		return () => <section class={Style.card}>{props.title}</section>;
	},
});
