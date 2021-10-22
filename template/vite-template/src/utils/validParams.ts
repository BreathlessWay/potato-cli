import getType from '@/utils/validType';

export const validStringParams = (params: any): boolean => {
	return params && getType.isString(params) && params.trim();
};

export const validFunctionParams = (params: any): boolean => {
	return params && getType.isFunction(params);
};

export const validArrayParams = (params: any): boolean => {
	return params && getType.isArray(params) && params.length > 0;
};

export const validObjectParams = (params: any): boolean => {
	return params && getType.isObject(params) && Object.keys(params).length > 0;
};

export const validObjectInstanceType = (params: any, type: string): boolean => {
	return (
		params && Object.prototype.toString.call(params) === `[object ${type}]`
	);
};

export const validRegExpParams = (params: any): boolean => {
	return params && getType.isRegExp(params);
};

export const validNumberParams = (params: any): boolean => {
	return getType.isNumber(params) && !isNaN(params) && !isFinite(params);
};
