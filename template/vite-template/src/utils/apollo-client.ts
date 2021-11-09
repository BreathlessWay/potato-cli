import {
	ApolloClient,
	HttpLink,
	ApolloLink,
	InMemoryCache,
	from,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import { logErrorMessages } from '@vue/apollo-util';
import lget from 'lodash/get';

import packageJson from '../../package.json';

const beforeLink = new ApolloLink((operation, forward) => {
	console.info(
		`%c开始 ${operation.operationName} 请求`,
		'color: #154cff;background: #e3e3e3; padding: 3px 5px; border-radius: 5px;'
	);
	operation.setContext({ start: Date.now() });
	operation.setContext(({ headers = {} }) => {
		return {
			headers: {
				...headers,
				Authentication: 'Bearer abc123', // 获取token
			},
		};
	});
	return forward(operation);
});

const afterLink = new ApolloLink((operation, forward) => {
	return forward(operation).map(data => {
		// 请求结果以及耗时收集点
		// 网络错误不走此处，graphql错误走
		if (import.meta.env.DEV && !data.errors) {
			const time = Date.now() - operation.getContext().start;
			console.group(
				`%c${operation.operationName} 请求完成，耗时 ${time}ms，请求结果：`,
				'color: purple; background: #e3e3e3; padding: 3px 5px; border-radius: 5px;'
			);
			console.dir(data);
			console.groupEnd();
		}
		return data;
	});
});

// 与 API 的 HTTP 连接
const httpLink = new HttpLink({
	// 你需要在这里使用绝对路径
	uri: '/api',
});

const errorLink = onError(error => {
	// 错误日志收集点
	error.networkError = error.networkError || new Error();
	switch (+lget(error, 'networkError.statusCode')) {
		case 400:
			error.networkError.message = '请求错误';
			break;
		case 401:
		case 403:
			error.networkError.message = '拒绝访问';
			break;
		case 404:
			error.networkError.message = `请求地址出错: ${
				lget(error, 'networkError.result.path') ||
				lget(error, 'networkError.response.url')
			}`;
			break;
		case 408:
			error.networkError.message = '请求超时';
			break;
		case 500:
		case 501:
		case 502:
		case 503:
		case 504:
			error.networkError.message = '服务器开个小差，请稍后再试';
			break;
		case 505:
			error.networkError.message = 'HTTP版本不受支持';
			break;
		default:
			error.networkError.message = '请求失败，请稍后再试';
	}

	if (import.meta.env.DEV) {
		const time = Date.now() - error.operation.getContext().start;
		console.group(
			`%c${error.operation.operationName} 请求失败，耗时 ${time}ms，失败原因：`,
			'color: red; background: #e3e3e3; padding: 3px 5px; border-radius: 5px;'
		);
		logErrorMessages(error, false);
		console.groupEnd();
	}
});

// 缓存实现
const cache = new InMemoryCache();

// 创建 apollo 客户端
export const apolloClient = new ApolloClient({
	link: from([beforeLink, afterLink, errorLink, httpLink]),
	cache,
	// Provide some optional constructor fields
	name: packageJson.name,
	version: packageJson.version,
	defaultOptions: {
		// The useQuery hook uses Apollo Client's watchQuery function.
		// To set defaultOptions when using the useQuery hook, make sure to set them under the defaultOptions.watchQuery property.
		watchQuery: {
			fetchPolicy: 'cache-first',
		},
	},
});

export default apolloClient;
