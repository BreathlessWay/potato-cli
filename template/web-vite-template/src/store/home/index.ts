import { Module } from 'vuex';

import { HomeModuleActions, HomeStateType } from '@/store/home/types';

export default {
	namespaced: true,

	// 模块内容（module assets）
	state: () => ({
		a: 111,
		b: 222,
	}), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
	getters: {
		// isAdmin(state: HomeStateType) {}, // -> getters['home/isAdmin']
	},
	actions: {
		[HomeModuleActions.Dispatch_Login]({ commit }) {
			commit(HomeModuleActions.Commit_Login);
		}, // -> dispatch('home/login')
	},
	mutations: {
		[HomeModuleActions.Commit_Login](state, payload) {
			console.log(state.a, payload);
		}, // -> commit('home/login')
	},
} as Module<HomeStateType, never>;
