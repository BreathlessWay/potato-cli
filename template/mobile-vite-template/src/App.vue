<template>
	<section class="potato-safe-area-bottom potato-flex">
		<div id="nav" class="potato-hairline--surround">
			<router-link to="/"> Home </router-link> |
			<router-link to="/about"> About </router-link> |
			<router-link to="/404"> 404 </router-link>
		</div>
		<span>{{ buildDate }}</span>
		<router-view v-slot="{ Component, route }">
			<!-- 使用任何自定义过渡和回退到 `fade` -->
			<transition :name="route?.meta.transition || 'fade'">
				<component :is="Component" />
			</transition>
		</router-view>
	</section>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

watch(router, () => {
	console.log('transition', router.meta);
});

// 发布时产生的版本信息，用于线上定位版本问题
const buildDate = import.meta.env.VITE_APP_BUILD_DATE;
</script>
<style lang="scss" src="./style.scss"></style>
