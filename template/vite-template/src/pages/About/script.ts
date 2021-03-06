import { defineComponent, ref, reactive, onMounted } from 'vue';

import Item from '@/components/templates/Item.vue';

import { useRouter } from '@/hooks/route';
import { useHomeStore } from '@/store/home';

import { AboutRoutesName } from '@/router/about';

export default defineComponent({
	components: {
		item: Item,
	},
	setup() {
		const oItem = ref<InstanceType<typeof Item>>();

		const s = useHomeStore();

		console.log('s.state', s.a);

		const m = reactive({
			a: 1,
		});

		onMounted(() => {
			console.log('about', oItem.value.title1);
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
