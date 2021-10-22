import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
	// `method` is the request method to be used when making the request
	method: 'get', // default

	// `baseURL` will be prepended to `url` unless `url` is absolute.
	// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
	// to methods of that instance.
	baseURL: '',

	// `timeout` specifies the number of milliseconds before the request times out.
	// If the request takes longer than `timeout`, the request will be aborted.
	timeout: 4000,

	// `withCredentials` indicates whether or not cross-site Access-Control requests
	// should be made using credentials
	withCredentials: false, // default

	// `responseType` indicates the type of data that the server will respond with
	// options are 'arraybuffer', 'blob', 'document', 'json', 'text'
	responseType: 'json', // default
	// `progress` allows handling of progress events for 'POST' and 'PUT uploads'
	// as well as 'GET' downloads

	validateStatus(status) {
		return status >= 200 && status < 300;
	},
};

for (const p in config) {
	axios.defaults[p as keyof AxiosRequestConfig] =
		config[p as keyof AxiosRequestConfig];
}

// 添加一个请求拦截器
axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// 添加一个响应拦截器
axios.interceptors.response.use(
	function (response) {
		// Do something with response data
		return response;
	},
	function (error) {
		// Do something with response error
		let errorReason = '';
		if (+error.response.status === 401) {
			errorReason = '没有操作权限，请先登录';
		} else {
			errorReason = '接口请求失败';
		}
		return Promise.reject(errorReason);
	}
);
