import { HomeStateType } from '@/store/home/types';

import { createStore, createLogger } from 'vuex';
import createPersistence from 'vuex-persistedstate';

import { storageHandler } from '@/utils/secure';

import packageJson from '../../package.json';

// 加载所有模块
const loadModules = () => {
	const context = require.context('./', true, /^\.\/?([a-z_]+)\/index\.ts$/i);

	const modules = context
		.keys()
		.map(key => ({
			key,
			name: key.match(/^\.\/?([a-z_]+)\/index\.ts$/i)?.[1],
		}))
		.reduce(
			(modules, { key, name }) => ({
				...modules,
				[name as string]: context(key).default,
			}),
			{}
		);

	return { context, modules };
};

const { context, modules } = loadModules();

export interface RootState {
	home: HomeStateType;
}

const plugins = [
	createPersistence({
		key: packageJson.path,
		storage: storageHandler,
		paths: ['home'],
	}),
];

process.env.NODE_ENV !== 'production' && plugins.push(createLogger());

const store = createStore<RootState>({
	strict: true,
	modules,
	plugins,
});

if (module.hot) {
	// 在任何模块发生改变时进行热重载。
	module.hot.accept(context.id, () => {
		const { modules } = loadModules();

		store.hotUpdate({
			modules,
		});
	});
}

export default store
