import { App } from 'vue';

export const registerDirectives = (app: App<Element>) => {
	app.directive('focus', (el, binding) => {
		el.focus();
	});

	// v-role:currentRole="componentRole"
	// v-role={ value: componentRole, arg: currentRole }
	// 二选一 不可混用
	app.directive('role', (el, binding) => {
		// 这将被作为 `mounted` 和 `updated` 调用
		// binding.arg 是我们传递给指令的参数
		let componentRole, currentRole;
		if (binding.arg) {
			currentRole = binding.arg;
			componentRole = binding.value;
		} else {
			currentRole = binding.value?.arg;
			componentRole = binding.value?.value;
		}
		if (componentRole !== currentRole) {
			const displayStyle =
				el.style.display || window.getComputedStyle(el, null).display;
			el.style.display = 'none';
			el.setAttribute('display-style', displayStyle);
		} else {
			const showDisplayStyle = el.getAttribute('display-style');
			if (showDisplayStyle) {
				el.style.display = showDisplayStyle;
				el.setAttribute('display-style', showDisplayStyle);
			}
		}
	});
};
