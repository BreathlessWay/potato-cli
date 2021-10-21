import { resolve } from 'path';

import { CommonTemplateDir, ProjectSrcPath } from '@/constants';

export const StoreTargetPath = resolve(ProjectSrcPath, 'store');

export const StoreEntryFilePath = resolve(StoreTargetPath, 'index.ts');

export const storeIndexTemplatePath = resolve(
	CommonTemplateDir,
	'store/index.ejs'
);

export const storeTypeTemplatePath = resolve(
	CommonTemplateDir,
	'store/types.ejs'
);
