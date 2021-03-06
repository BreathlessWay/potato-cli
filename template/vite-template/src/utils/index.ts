export const platforms = {
	isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
	isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
	isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
	isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
};

export const getQueryString = (name: string, url?: string) => {
	url = url || window.location.href;
	const query = url.split('?')[1];
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
		r = query.match(reg);
	return r ? r[2] : null;
};

export const getType = (data: any) =>
	Object.prototype.toString
		.call(data)
		.match(/\s([a-zA-Z]+)/)?.[1]
		.toLowerCase();
