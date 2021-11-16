import SecureLS from 'secure-ls';

import packageJson from '../../package.json';

const ls = new SecureLS({
	isCompression: false,
	encodingType: 'base64',
	encryptionSecret: packageJson.name,
});

export const storageHandler = {
	setItem: (key: string, data: any): void => ls.set(key, data),
	getItem: (key: string): any => ls.get(key),
	removeItem: (key: string): void => ls.remove(key),
	clear: (): void => ls.clear(),
};
