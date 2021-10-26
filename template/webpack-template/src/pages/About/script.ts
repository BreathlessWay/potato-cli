import { defineComponent, ref, reactive, onMounted } from 'vue';

import { useRouter } from '@/hooks/route';
import { useStore } from '@/hooks/store';

import { AboutRoutesName } from '@/router/about';

import Item from '@/components/templates/Item.vue';

export default defineComponent({
	components: {
		item: Item,
	},
	setup() {
		const oItem = ref<InstanceType<typeof Item>>();

		const s = useStore();

		console.log('s.state', s.state.home);

		const m = reactive({
			a: 1,
		});

		onMounted(() => {
			console.log('about', oItem.value?.aaa);
		});

		const handleCC = (...args: Array<number>) => {
			console.log(args);
		};

		const handleChange = () => {
			m.a++;
		};

		const router = useRouter();

		const jumpUserProfile = () => {
			router.push({
				name: AboutRoutesName.profile,
			});
		};

		const jumpUserPosts = () => {
			router.push({
				name: AboutRoutesName.posts,
				params: {
					id: 1,
				},
			});
		};

		return {
			oItem,
			m,
			handleCC,
			handleChange,
			jumpUserProfile,
			jumpUserPosts,
		};
	},
});
