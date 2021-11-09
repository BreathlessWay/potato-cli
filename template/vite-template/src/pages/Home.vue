<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="bbb">111</div>
		<HelloWorld
			v-role="{ value: role, arg: sRole }"
			msg="Welcome to Your Vue.js + TypeScript App"
		/>
		<Card />
		<button @click="handleChangeRole">role {{ homeStore.b }}</button>
		<button @click="handleStore">store {{ homeStore.a }}</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';

import HelloWorld from '@/components/templates/HelloWorld.vue'; // @ is an alias to /src
import Card from '@/components/templates/Card';

import { useHomeStore } from '@/store/home';

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
	computed: {
		...mapStores(useHomeStore),
	},
	mounted() {
		console.log(this.$http);
	},
	methods: {
		handleStore() {
			console.log(this.homeStore.$state);
			this.homeStore.reset(222);
		},
		handleChangeRole() {
			this.role = this.role === 'AM1' ? 'BM2' : 'AM1';
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
