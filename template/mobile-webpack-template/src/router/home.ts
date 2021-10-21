import Home from '@/pages/Home.vue';
import NotFound from '@/pages/NotFound/index.vue';

import { RouteRecordRaw } from 'vue-router';

export enum HomeRoutesName {
	Home = 'Home',
	NotFound = 'NotFound',
}

const HomeRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		name: HomeRoutesName.Home,
		meta: {
			requireAuth: false,
			title: '',
		},
		component: Home,
	},
	{
		path: '/404',
		name: HomeRoutesName.NotFound,
		component: NotFound,
	},
];

export default HomeRoutes;
