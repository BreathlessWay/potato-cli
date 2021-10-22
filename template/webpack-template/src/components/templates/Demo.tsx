import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Demo',

	props: {},

	setup(props, { slots }) {
		return () => <section>{slots.default?.()}</section>;
	},
});
