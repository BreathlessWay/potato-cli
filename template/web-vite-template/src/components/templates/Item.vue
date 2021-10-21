<template>
	<li ref="root" @click="handleClick">
		{{ title }} {{ title1 }} {{ m.a }}
		<input type="text" v-focus />
	</li>
</template>

<script lang="ts" setup>
import {
	toRef,
	toRefs,
	ref,
	onMounted,
	defineProps,
	defineEmits,
	defineExpose,
	useAttrs,
	useSlots,
	watch,
	PropType,
} from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	m: {
		type: Object as PropType<{ a: number }>,
		required: true,
	},
});

console.log(props);

const emits = defineEmits(['cc']);

const root = ref(null);

const title1 = toRef(props, 'title');
const { m } = toRefs(props);
console.log(m.value);
onMounted(() => {
	console.log(root.value);
});

const handleClick = () => {
	emits('cc', 111);
};

const attrs = useAttrs();
const slots = useSlots();

console.log(attrs, slots);

defineExpose({
	attrs,
	title1: title1.value,
});

watch(
	m,
	(nVal, oVal) => {
		console.log(nVal, oVal);
	},
	{
		deep: true,
	}
);
</script>
