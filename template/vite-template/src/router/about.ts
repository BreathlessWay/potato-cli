import { RouteRecordRaw } from 'vue-router';

export enum AboutRoutesName {
	About = 'About',
	profile = 'profile',
	posts = 'posts',
}

const AboutRoutes: RouteRecordRaw[] = [
	{
		path: '/about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../pages/About/index.vue'),
		children: [
			{
				path: '',
				name: AboutRoutesName.About,
				meta: {
					requireAuth: false,
					title: '',
				},
				component: () =>
					import(/* webpackChunkName: "about" */ '../pages/Index'),
			},
			{
				path: 'profile',
				name: AboutRoutesName.profile,
				meta: {
					requireAuth: false,
					title: '',
				},
				component: () =>
					import(/* webpackChunkName: "user-profile" */ '../pages/UserProfile'),
			},
			{
				path: 'posts/:id',
				name: AboutRoutesName.posts,
				meta: {
					requireAuth: false,
					title: '',
				},
				component: () =>
					import(/* webpackChunkName: "user-posts" */ '../pages/UserPosts'),
			},
		],
	},
];

export default AboutRoutes;
