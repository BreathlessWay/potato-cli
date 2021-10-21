import { createRouter, createWebHistory } from 'vue-router';

import packageJson from '../../package.json';

import { HomeRoutesName } from '@/router/home';

// 加载所有模块。
const loadModules = () => {
	const context = require.context(
		'./',
		false,
		/^\.\/?(?!index)([a-z_]+)\.ts$/i
	);
	return context
		.keys()
		.map(key => ({
			key,
			name: key.match(/^\.\/?([a-z_]+)\.ts$/i)?.[1],
		}))
		.reduce(
			(modules, { key, name }) => modules.concat(context(key).default),
			[]
		);
};

const router = createRouter({
	history: createWebHistory(packageJson.path),
	routes: loadModules(),
});

// 路由权限
const isAuthenticated = false;
router.beforeEach((to, from, next) => {
	if (!to.matched.length) return next({ name: HomeRoutesName.NotFound });
	if (to.meta.requireAuth && !isAuthenticated) return next({ name: 'About' });
	next();
});

router.afterEach((to, from) => {
	const toDepth = to.path.split('/').filter(_ => _).length;
	const fromDepth = from.path.split('/').filter(_ => _).length;
	to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export default router;
