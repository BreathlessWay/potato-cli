<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="bbb">111</div>
		<HelloWorld
			v-role="{ value: role, arg: sRole }"
			msg="Welcome to Your Vue.js + TypeScript App"
		/>
		<Card />
		<button @click="handleChangeRole">role</button>
		<button @click="handleStore">store</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HelloWorld from '@/components/templates/HelloWorld.vue'; // @ is an alias to /src
import Card from '@/components/templates/Card';

import { HomeModuleDispatches } from '@/store/home/types';

export default defineComponent({
	data() {
		return {
			sRole: 'AM1',
			role: 'AM1',
		};
	},
	components: {
		HelloWorld,
		Card,
	},
	setup(props, ctx) {
		const a = async () => {
			const res = await new Promise(resolve =>
				setTimeout(() => resolve(2), 300)
			);
			console.log(res);
		};
		a();
		console.log(ctx);
	},
	mounted() {
		console.log(this.$http);
	},
	methods: {
		handleStore() {
			console.log(this.$store.state);
			this.$store.dispatch(HomeModuleDispatches.Dispatch_Login, 111);
		},
		handleChangeRole() {
			this.sRole = this.sRole === 'AM1' ? 'BM2' : 'AM1';
		},
	},
});
</script>
<style>
.home {
	width: 100vw;
	height: 100vh;
	background: #eee;
}
.bbb {
	width: 20px;
}
</style>
