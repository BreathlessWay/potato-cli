import { defineComponent, onMounted, ref } from 'vue';

import { Cell, Stepper, Toast } from 'vant';

export default defineComponent({
	name: 'Index',
	setup() {
		const role = ref('BM1');
		onMounted(() => {
			Toast('提示内容');
		});

		const handleClick = () => {
			role.value = role.value === 'BM1' ? 'AM1' : 'BM1';
		};

		return () => (
			<section>
				<Cell v-role:BM1={role.value} title='单元格2' value='内容1' />
				<br />
				<Stepper />
				<br />
				<br />
				<button onClick={handleClick}>权限</button>
			</section>
		);
	},
});
