import GetType from '@/utils/validType';
import { validNumberParams, validObjectParams } from '@/utils/validParams';

type BasicCookieConfig = Partial<{
	maxAge: string;
	expires: string | Date;
	domain: string;
	path: string;
	secure: boolean;
}>;

type CookieHandlerConfigType = {
	prefix?: string;
} & BasicCookieConfig;

export default class CookieHandler {
	config: CookieHandlerConfigType = {} as CookieHandlerConfigType;
	constructor(config: CookieHandlerConfigType = {}) {
		if (window && document && window.navigator.cookieEnabled) {
			this.config = config;
			this.config.prefix = config.prefix || '';
		} else {
			throw new Error('当前环境不支持cookie');
		}
	}

	get length() {
		return this.keys.length;
	}

	get keys() {
		return document.cookie
			.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
			.split(/\s*(?:=[^;]*)?;\s*/);
	}

	private computeKey = (key: string) => {
		if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
			throw new Error(`键值 key 错误`);
		}
		if (this.config.prefix && key.indexOf(this.config.prefix) === 0) {
			return key;
		}
		return this.config.prefix ? `${this.config.prefix}_${key}` : key;
	};

	private computeExpires = (expires: string | Date) => {
		let _expiresTime;
		try {
			if (GetType.isString(expires)) {
				const currentTime = new Date(expires);
				if (validNumberParams(currentTime.getTime())) {
					_expiresTime = currentTime.toUTCString();
				}
			}
			if (GetType.isDate(expires)) {
				_expiresTime = (expires as Date).toUTCString();
			}
		} catch (e) {
			console.error(e);
		}
		!_expiresTime && console.warn(`expires: ${expires} 不是正确的时间类型`);
		return _expiresTime;
	};

	private computeValue = <T extends any>(value: T) => {
		let _v;
		if (GetType.isArray(value)) {
			_v = (value as Array<any>).join(',');
		} else if (GetType.isObject(value)) {
			_v = JSON.stringify(value);
		} else if (GetType.isNull(value) || GetType.isUndefined(value)) {
			_v = '';
		} else {
			_v = (value as any).toString();
		}
		return encodeURIComponent(_v);
	};

	private computeMaxAge = (maxAge: string) => {
		const reg = /^(\d+)[d|h|m|s]$/;
		if (reg.test(maxAge)) {
			const num = Number(maxAge.replace(reg, '$1'));
			switch (true) {
				case maxAge.indexOf('d') > -1: {
					return num * 24 * 60 * 60;
				}
				case maxAge.indexOf('h') > -1: {
					return num * 60 * 60;
				}
				case maxAge.indexOf('m') > -1: {
					return num * 60;
				}
				case maxAge.indexOf('s') > -1: {
					return num;
				}
			}
		} else {
			console.warn(
				'max-age 格式不正确，将不会应用 max-age 属性，eg：1d、2h、3m、4s'
			);
		}
		return null;
	};

	setItem = <T extends any>(
		params: {
			key: string;
			value: T;
		} & BasicCookieConfig
	) => {
		try {
			if (!validObjectParams(params)) {
				throw new Error('缺少必要参数');
			}
			const { key, value, maxAge, expires, domain, path, secure } = params;
			const _value = `${this.computeKey(key)}=${this.computeValue<T>(value)};`;

			let _maxAge,
				_expires,
				_path = path || this.config.path,
				_domain = domain || this.config.domain,
				_secure: string | boolean | undefined = secure || this.config.secure;

			if (maxAge) {
				_maxAge = this.computeMaxAge(maxAge);
			}
			if (expires) {
				_expires = this.computeExpires(expires);
			}
			if (!_maxAge && !_expires) {
				_maxAge = this.config.maxAge && this.computeMaxAge(this.config.maxAge);
				_expires =
					this.config.expires && this.computeExpires(this.config.expires);
			}
			if (_maxAge) {
				_maxAge = `max-age=${_maxAge};`;
			}
			if (_expires) {
				_expires = `expires=${_expires};`;
			}

			if (_path) {
				_path = `path=${_path};`;
			}
			if (_domain) {
				_domain = `domain=${_domain};`;
			}
			if (GetType.isBoolean(_secure) && _secure) {
				_secure = `secure;`;
			}

			document.cookie = `${_value}${_maxAge}${_expires}${_path}${_domain}${_secure}`;
			return true;
		} catch (e: any) {
			console.error(e.message);
		}
		return false;
	};

	getItem = (key: string) => {
		try {
			key = this.computeKey(key);
			const reg = new RegExp(
					`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`
				),
				value = document.cookie.replace(reg, '$1');
			return decodeURIComponent(value);
		} catch (e: any) {
			console.error(e.message);
		}
	};

	removeItem = (key: string) => {
		try {
			if (key && this.hasItem(key)) {
				this.setItem({
					key,
					value: '',
					expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
				});
				return true;
			}
			return false;
		} catch (e: any) {
			console.error(e.message);
		}
	};

	hasItem = (key: string) => {
		try {
			key = this.computeKey(key);
			return new RegExp('(?:^|;\\s*)' + key + '\\s*\\=').test(document.cookie);
		} catch (e: any) {
			console.error(e.message);
		}
		return false;
	};

	clear = () => {
		try {
			this.keys.forEach(key => {
				this.removeItem(key);
			});
			return true;
		} catch (e: any) {
			console.error(e.message);
		}
		return false;
	};
}
