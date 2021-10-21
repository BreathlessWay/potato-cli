<template>
	<section>
		<ul>
			<item title="item" ref="oItem" @cc="handleCC" :m="m"></item>
		</ul>
		<div @click="handleChange">click</div>
		<button @click="jumpUserProfile">UserProfile</button>
		<button @click="jumpUserPosts">UserPosts</button>
		<Demo> Demo</Demo>
		<router-view />
	</section>
</template>
<script lang="ts" src="./script.ts"></script>
