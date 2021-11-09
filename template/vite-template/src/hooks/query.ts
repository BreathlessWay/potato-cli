import { useQuery } from '@vue/apollo-composable';

import { OperationVariables } from '@apollo/client/core';
import {
	DocumentParameter,
	OptionsParameter,
	UseQueryReturn,
	VariablesParameter,
} from '@vue/apollo-composable/dist/useQuery';

const useBasicQuery = <TResult, TVariables extends OperationVariables>(
	document: DocumentParameter<TResult, TVariables>,
	variables?: VariablesParameter<TVariables>,
	options?: OptionsParameter<TResult, TVariables>
): UseQueryReturn<TResult, TVariables> => {
	options = options || {};
	// 为了使 UI 组件在调用 fetchMore 之后 自动更新的 loading ref
	// 必须在 useQuery 的选项中将 notifyOnNetworkStatusChange 设置为 true
	(options as Record<string, any>).notifyOnNetworkStatusChange = true;
	const result = useQuery<TResult, TVariables>(
		document,
		variables as VariablesParameter<TVariables>,
		options as OptionsParameter<TResult, TVariables>
	);

	return result as UseQueryReturn<TResult, TVariables>;
};

export default useBasicQuery;
