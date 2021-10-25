import SecureLS from 'secure-ls';

import packageJson from '../../package.json';

 const ls = new SecureLS({
	isCompression: false,
	encodingType: 'base64',
	encryptionSecret: packageJson.name,
});

 export const storageHandle = {
	 setItem: (key: string, value: string) => ls.set(key, value),
	 getItem: (key: string): string | null => ls.get(key),
	 removeItem: (key: string) => ls.remove(key),
 }
