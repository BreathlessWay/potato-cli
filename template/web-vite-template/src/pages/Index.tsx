import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	name: 'Index',
	setup() {
		const role = ref('BM1');
		onMounted(() => {
			console.log('onMounted');
		});

		const handleClick = () => {
			role.value = role.value === 'BM1' ? 'AM1' : 'BM1';
		};

		return () => (
			<section>
				<div v-role={{ value: 'BM1', arg: role.value }}>内容1</div>
				<br />
				<br />
				<button onClick={handleClick}>权限</button>
			</section>
		);
	},
});
