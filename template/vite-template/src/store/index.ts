import { HomeStateType } from '@/store/home/types';

import { createStore, createLogger, ModuleTree } from 'vuex';
import createPersistence from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

import packageJson from '../../package.json';

export interface RootState {
	home: HomeStateType;
}

const ls = new SecureLS({
	isCompression: false,
	encodingType: 'base64',
	encryptionSecret: packageJson.name,
});
// 加载所有模块
const loadModules = () => {
	const context = import.meta.globEager('./*/index.ts');

	const modules: Record<string, ModuleTree<RootState>> = {};

	Object.keys(context).forEach((key: string) => {
		const name = key.match(/^\.\/?([a-z_]+)\/index\.ts$/i)?.[1];
		name && (modules[name] = context[key].default);
	});
	return { context, modules };
};

const { context, modules } = loadModules();

const plugins = [
	createPersistence({
		key: packageJson.path,
		storage: {
			getItem: key => ls.get(key),
			setItem: (key, value) => ls.set(key, value),
			removeItem: key => ls.remove(key),
		},
		paths: ['home'],
	}),
];

import.meta.env.DEV && plugins.push(createLogger());

export const store = createStore<RootState>({
	strict: true,
	modules,
	plugins,
});

if (import.meta.hot) {
	// 在任何模块发生改变时进行热重载。
	import.meta.hot.accept(Object.keys(context), () => {
		const { modules } = loadModules();

		store.hotUpdate({
			modules,
		});
	});
}
