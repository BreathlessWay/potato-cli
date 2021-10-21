import { resolve } from 'path';

import { CommonTemplateDir, ProjectSrcPath } from '@/constants';

export enum ERouterConfig {
	RouterName = 'RouterName',
	PagePath = 'PagePath',
	RouterType = 'RouterType',
	RouterPath = 'RouterPath',
}

export const RouterPagePath = resolve(ProjectSrcPath, 'pages');

export const RouteTargetPath = resolve(ProjectSrcPath, 'router');

export const maybeFileExt = ['', '.vue', '.tsx'];

export const maybeFileName = ['index.vue', 'index.tsx'];

export const routerTemplatePath = resolve(
	CommonTemplateDir,
	'route/router.ejs'
);
