import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'UserPosts',
	setup(props) {
		const route = useRoute();
		console.log(route.params.id);
		return () => <section>UserPosts</section>;
	},
	mounted() {
		console.log(this.$route.params.id);
	},
});
