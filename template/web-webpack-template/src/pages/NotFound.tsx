import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NotFound',
	setup() {
		return () => <section>404</section>;
	},
});
