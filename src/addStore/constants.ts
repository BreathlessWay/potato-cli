import { resolve } from 'path';

import { CommonTemplateDir, ProjectSrcPath } from '@/constants';

export const StoreTargetPath = resolve(ProjectSrcPath, 'store');

export const StoreEntryFilePath = resolve(StoreTargetPath, 'index.ts');

export const StoreIndexTemplatePath = resolve(
	CommonTemplateDir,
	'store/index.ejs'
);

export const StoreTypeTemplatePath = resolve(
	CommonTemplateDir,
	'store/types.ejs'
);

export const StoreViteTemplatePath = resolve(
	CommonTemplateDir,
	'store/vite.ejs'
);
