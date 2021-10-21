import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { lineSpaceLog, normalLog } from '@/log';
import { camelCase, KebabCase, parseTemplate, validFile } from '@/utils';
import { parseStore } from '@/addStore/parseStore';

import {
	StoreEntryFilePath,
	StoreTargetPath,
	storeIndexTemplatePath,
	storeTypeTemplatePath,
} from '@/addStore/constants';

export const createStore = async (storeName: string) => {
	const storePath = resolve(StoreTargetPath, storeName);

	await validFile(storePath);

	const storeIndexFilePath = resolve(storePath, 'index.ts'),
		storeTypeFilePath = resolve(storePath, 'types.ts'),
		templateConfig = {
			StoreName: storeName,
			ModuleName: KebabCase(storeName),
			SpaceName: camelCase(storeName),
		};

	await parseTemplate({
		from: storeIndexTemplatePath,
		to: storeIndexFilePath,
		setting: templateConfig,
	});
	await parseTemplate({
		from: storeTypeTemplatePath,
		to: storeTypeFilePath,
		setting: templateConfig,
	});

	let fileContent = readFileSync(StoreEntryFilePath, 'utf-8');
	fileContent = parseStore(fileContent, templateConfig);
	writeFileSync(StoreEntryFilePath, fileContent, 'utf-8');

	normalLog(`> 数据集创建成功：${storePath}`);
	lineSpaceLog();
};
