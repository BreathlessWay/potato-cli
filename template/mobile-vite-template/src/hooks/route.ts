import { useRouter as baseUseRouter, RouteLocationRaw } from 'vue-router';

export const useRouter = () => {
	// 试图离开未保存的编辑文本界面
	const router = baseUseRouter();

	return {
		async push(to: RouteLocationRaw) {
			const navigationResult = await router.push(to);

			if (navigationResult) {
				console.log('router push fail');
				return navigationResult;
			}
			console.log('router push success');
		},
	};
};
