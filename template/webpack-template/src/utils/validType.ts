const TypeList = [
	'Number',
	'String',
	'Undefined',
	'Null',
	'Boolean',
	'Symbol',
	'Array',
	'RegExp',
	'Date',
	'Function',
	'Object',
];

type TypeKey =
	| 'isNumber'
	| 'isString'
	| 'isUndefined'
	| 'isNull'
	| 'isBoolean'
	| 'isSymbol'
	| 'isArray'
	| 'isRegExp'
	| 'isDate'
	| 'isFunction'
	| 'isObject';

type TypeMapType = Record<TypeKey, (params: any) => boolean>;

const GetType: TypeMapType = {} as TypeMapType;

TypeList.forEach(type => {
	GetType[`is${type}` as TypeKey] = data => {
		return Object.prototype.toString.call(data) === `[object ${type}]`;
	};
});

export default GetType;
