<template>
	<li ref="root" @click="handleClick">
		{{ title }} {{ title1 }} {{ m1.a }}
		<input type="text" v-focus />
	</li>
</template>

<script lang="ts">
import {
	defineComponent,
	toRef,
	toRefs,
	ref,
	onMounted,
	useAttrs,
	useSlots,
	watch,
	PropType,
} from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: '',
		},
		m: {
			type: Object as PropType<{ a: number }>,
			required: true,
		},
	},
	emits: ['cc'],
	setup(props, { emit, expose }) {
		const root = ref(null);

		const title1 = toRef(props, 'title');
		const { m } = toRefs(props);
		console.log('m.value', m.value);
		onMounted(() => {
			console.log(root.value);
		});

		const handleClick = () => {
			emit('cc', 111);
		};

		const attrs = useAttrs();
		const slots = useSlots();

		console.log(attrs, slots);

		watch(
			m,
			(nVal, oVal) => {
				console.log(nVal, oVal);
			},
			{
				deep: true,
			}
		);

		return {
			handleClick,
			title1,
			m1: m.value,
			aaa: 111
		};
	},
});
</script>
