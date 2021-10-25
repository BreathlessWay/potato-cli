import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { lineSpaceLog, normalLog } from '@/log';
import { camelCase, KebabCase, parseTemplate, validFile } from '@/utils';
import { parseStore } from '@/addStore/parseStore';

import { ProjectPackageJson } from '@/constants';
import {
	StoreEntryFilePath,
	StoreTargetPath,
	StoreIndexTemplatePath,
	StoreTypeTemplatePath,
	StoreViteTemplatePath,
} from '@/addStore/constants';

export const createStore = async (storeName: string) => {
	let storePath;

	const packageJson = JSON.parse(readFileSync(ProjectPackageJson, 'utf-8')),
		templateConfig = {
			StoreName: storeName,
			ModuleName: KebabCase(storeName),
			SpaceName: camelCase(storeName),
		};

	if (packageJson?.devDependencies?.vite) {
		storePath = resolve(StoreTargetPath, `${storeName}.ts`);

		await validFile(storePath);

		await parseTemplate({
			from: StoreViteTemplatePath,
			to: storePath,
			setting: templateConfig,
		});
	} else {
		storePath = resolve(StoreTargetPath, storeName);
		const storeIndexFilePath = resolve(storePath, 'index.ts'),
			storeTypeFilePath = resolve(storePath, 'types.ts');

		await validFile(storePath);

		await parseTemplate({
			from: StoreIndexTemplatePath,
			to: storeIndexFilePath,
			setting: templateConfig,
		});
		await parseTemplate({
			from: StoreTypeTemplatePath,
			to: storeTypeFilePath,
			setting: templateConfig,
		});

		let fileContent = readFileSync(StoreEntryFilePath, 'utf-8');
		fileContent = parseStore(fileContent, templateConfig);
		writeFileSync(StoreEntryFilePath, fileContent, 'utf-8');
	}
	normalLog(`> 数据集创建成功：${storePath}`);
	lineSpaceLog();
};
