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
			<transition :name="route.meta.transition || 'fade'">
				<component :is="Component" />
			</transition>
		</router-view>
	</section>
</template>
<script setup lang="ts">
// 发布时产生的版本信息，用于线上定位版本问题
const buildDate = process.env.VUE_APP_BUILD_DATE;
</script>
<style lang="scss" src="./style.scss"></style>
