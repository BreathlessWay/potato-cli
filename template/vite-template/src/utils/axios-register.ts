// 类型添加
import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		ignoreFailCallback?: boolean;
		expire?: number | string;
	}
}
// 功能模块
import axios from 'axios';
import * as qs from 'qs';

import type {
	AxiosRequestConfig,
	CancelTokenSource,
	AxiosResponse,
} from 'axios';

const getKey = (config: AxiosRequestConfig) => {
	return [
		config?.method || 'get',
		config?.url,
		qs.stringify(config?.params),
		qs.stringify(config?.data),
	].join('_');
};

const getTargetDate = (expire?: number | string) => {
	if (!expire) return 0;
	const reg = /^(\d+)(d|h|m|s|ms)?$/,
		result = expire.toString().match(reg),
		num = Number(result?.[1]),
		unit = result?.[2];

	if (isNaN(num)) {
		console.info(
			`%c过期时间 ${expire} 设置有误，本次请求不会缓存`,
			'color: #ccd54d'
		);
		return 0;
	}

	let millisecond = num;
	switch (unit) {
		case 'd': {
			millisecond = num * 24 * 60 * 60 * 1000;
			break;
		}
		case 'h': {
			millisecond = num * 60 * 60 * 1000;
			break;
		}
		case 'm': {
			millisecond = num * 60 * 1000;
			break;
		}
		case 's': {
			millisecond = num * 1000;
			break;
		}
	}

	return Date.now() + millisecond;
};

/**
 * 回调方法
 * @callback PromiseCallback
 * @param {Object} [error]
 * @param {String} [error.message] - 错误信息
 */
/**
 * @typedef AuthHook
 * @type {Object|Boolean}
 * @property {PromiseCallback} authTokenHook - 获取权限token函数
 * @property {PromiseCallback} authFailHook - 权限校验失败 401 时处理函数
 */
/**
 * @function 初始化axios配置
 * @description 初始化axios全局配置
 * @param {Object} [params] - 方法初始化参数
 * @param {String[]} [params.whitelist] - 需要被全局错误处理函数忽略的请求url
 * @param {AuthHook} [params.authHook] - 权限处理方法，当不传递时会有默认处理行为但不推荐，传false关闭权限钩子
 * @param {PromiseCallback} params.requestFailHook - 全局错误处理函数
 * @returns void
 * @author zhujian 2021/10/27
 */
const axiosRegister = (
	params: {
		whitelist?: Array<string>;
		authHook?: {
			authTokenHook: () => Promise<string>;
			authFailHook: (error: any) => Promise<void>;
		};
		requestFailHook?: (error: any) => Promise<void>;
	} & AxiosRequestConfig = {}
) => {
	const AUTH_TOKEN_KEY = 'auth-token',
		{
			whitelist,
			authHook,
			requestFailHook,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			validateStatus,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			cancelToken,
			...rest
		} = params,
		cancelMap = new Map<string, CancelTokenSource>(),
		getCacheMap = new Map<string, { expire: number; result: AxiosResponse }>();

	let _authTokenHook: () => Promise<string>,
		_authFailHook: (error: any) => Promise<void>;
	if (authHook) {
		_authTokenHook = authHook.authTokenHook;
		_authFailHook = authHook.authFailHook;
		// authTokenHook和authFailHook必须是配套出现的
		if (!_authTokenHook || !_authFailHook) {
			throw new Error('authTokenHook 和 authFailHook 需要同时配置');
		}
	} else if (authHook === void 0) {
		// 不建议使用默认的 authHook
		_authTokenHook = async () => {
			let token = localStorage.getItem(AUTH_TOKEN_KEY);
			if (token) return token;
			const query = qs.parse(location.search.split('?')?.[1]);
			token = (query.token || query.CourseToken) as string;
			if (token) {
				localStorage.setItem(AUTH_TOKEN_KEY, token);
				return token;
			}
			return '';
		};
		_authFailHook = async () => {
			localStorage.removeItem(AUTH_TOKEN_KEY);
		};
	}

	const removeCancel = (config: AxiosRequestConfig) => {
		cancelMap.delete(getKey(config));
	};

	type source = `${'request' | 'response'}-${'fulfilled' | 'rejected'}`;
	const failHandler = async (error: any, source: source) => {
		if (axios.isCancel(error)) {
			console.info(
				`%c重复的请求 ${error?.config?.url}，被取消，${error.message}`,
				'color: purple'
			);
			return;
		}

		removeCancel(error?.config);
		if (+error?.response?.status === 401) {
			_authFailHook && (await _authFailHook(error));
		}
		// 优先使用 config 中的 ignoreFailCallback 跳过公共错误处理方法
		if (error?.config?.ignoreFailCallback) {
			console.info(
				`%c错误出现点：${source}，通过 ignoreFailCallback 忽略公共错误处理方法`,
				'color: #d900ff'
			);
			return;
		}
		// 其次使用 whitelist 跳过公共错误处理方法
		const _url = error?.config?.url.split('?')?.[0];
		if (_url && whitelist?.includes(_url)) {
			console.info(
				`%c错误出现点：${source}，通过 whitelist 忽略公共错误处理方法`,
				'color: #d900ff'
			);
			return;
		}

		requestFailHook && (await requestFailHook(error));
	};

	let config: AxiosRequestConfig = {
		// `method` is the request method to be used when making the request
		method: 'get', // default

		// `baseURL` will be prepended to `url` unless `url` is absolute.
		// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
		// to methods of that instance.
		baseURL: '/api',

		// `timeout` specifies the number of milliseconds before the request times out.
		// If the request takes longer than `timeout`, the request will be aborted.
		timeout: 30000,

		// `withCredentials` indicates whether or not cross-site Access-Control requests
		// should be made using credentials
		withCredentials: false, // default

		// `responseType` indicates the type of data that the server will respond with
		// options are 'arraybuffer', 'blob', 'document', 'json', 'text'
		responseType: 'json', // default

		validateStatus: function (status) {
			return status >= 200 && status < 300; // default
		},
	};

	config = { ...config, ...rest };

	for (const p in config) {
		axios.defaults[p as keyof AxiosRequestConfig] =
			config[p as keyof AxiosRequestConfig];
	}

	// 添加一个请求拦截器
	axios.interceptors.request.use(
		async config => {
			// Do something before request is sent
			const key = getKey(config),
				repeatRequest = cancelMap.get(key);
			if (repeatRequest) {
				repeatRequest.cancel();
			}
			cancelMap.set(key, axios.CancelToken.source());

			config.headers = config.headers || {};
			if (_authTokenHook) {
				let token = await _authTokenHook();
				if (token) {
					const authPrefix = 'Bearer ';
					token = token.startsWith(authPrefix)
						? token
						: `${authPrefix}${token}`;
					config.headers.Authorization = token;
				}
			}
			return config;
		},
		async error => {
			await failHandler(error, 'request-rejected');
			throw error;
		}
	);

	// 添加一个响应拦截器
	axios.interceptors.response.use(
		async response => {
			const key = getKey(response.config);

			if (response?.config?.method === 'get') {
				const cache = getCacheMap.get(key);
				!cache &&
				getCacheMap.set(key, {
					expire: getTargetDate(response.config.expire),
					result: response,
				});
			}

			// Do something with response data
			if (+(response?.data as Record<any, any>)?.code === 200) {
				const { headers, config, data } = response;
				removeCancel(config);

				return {
					data,
					headers,
					config,
				};
			}
			await failHandler(response, 'response-fulfilled');
			throw response;
		},
		async error => {
			// Do something with response error
			switch (+error?.response?.status) {
				case 400:
					error.message = '请求错误';
					break;
				case 401:
				case 403:
					error.message = '拒绝访问';
					break;
				case 404:
					error.message = `请求地址出错: ${error?.response?.request?.responseURL}`;
					break;
				case 408:
					error.message = '请求超时';
					break;
				case 500:
				case 501:
				case 502:
				case 503:
				case 504:
					error.message = '服务器开个小差，请稍后再试';
					break;
				case 505:
					error.message = 'HTTP版本不受支持';
					break;
				default:
					error.message = '请求失败，请稍后再试';
			}
			await failHandler(error, 'response-rejected');
			throw error;
		}
	);

	const preAxiosGet = axios.get;

	axios.get = async function (url, config): Promise<any> {
		const key = getKey({ url, ...config });
		const cacheResult = getCacheMap.get(key);
		if (cacheResult) {
			if (cacheResult.expire > Date.now()) {
				console.info(`%c当前请求 ${url} 缓存时间未到，使用缓存`, 'color: blue');
				return cacheResult.result;
			} else {
				getCacheMap.delete(key);
				console.info(
					`%c当前请求 ${url} 缓存时间已过，重新请求`,
					'color: #5f9ea0'
				);
			}
		} else {
			console.info(`%c当前请求 ${url} 没有缓存，重新请求`, 'color: green');
		}
		return preAxiosGet.call(this, url, config);
	};
};

export default axiosRegister;
