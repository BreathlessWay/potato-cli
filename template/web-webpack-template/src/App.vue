<template>
	<section class="potato-flex">
		<div id="nav">
			<router-link to="/"> Home </router-link> |
			<router-link to="/about"> About </router-link>
		</div>
		<span>{{ buildDate }}</span>
		<router-view />
	</section>
</template>
<script setup lang="ts">
// 发布时产生的版本信息，用于线上定位版本问题
const buildDate = process.env.VUE_APP_BUILD_DATE;
</script>
<style lang="scss" src="./style.scss"></style>
