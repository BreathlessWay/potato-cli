import { defineStore, acceptHMRUpdate } from 'pinia';

import { storageHandler } from '@/store/secure';

import { PersistOptions } from 'pinia-plugin-persist';

// home is the name of the store. It is unique across your application
// and will appear in devtools
export const useHomeStore = defineStore('home', {
	// a function that returns a fresh state
	state: () => ({
		a: 44,
		b: 555,
	}),
	// optional getters
	getters: {
		// getters receive the state as first parameter
		doubleCount: state => state.a * 2,
		// use getters in other getters
		doubleCountPlusOne(): number {
			return this.doubleCount * 2 + 1;
		},
	},
	// optional actions
	actions: {
		reset(data: number) {
			// `this` is the store instance
			this.a = data;
		},
	},
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'store-home',
				storage: storageHandler,
			},
		],
	} as PersistOptions,
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot));
}
