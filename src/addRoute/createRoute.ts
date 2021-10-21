import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { parseRoute } from '@/addRoute/parseRoute';

import { lineSpaceLog, normalLog } from '@/log';
import { KebabCase, parseTemplate } from '@/utils';
import { getNameFromPath } from '@/addRoute/utils';

import {
	ERouterConfig,
	RouteTargetPath,
	routerTemplatePath,
} from '@/addRoute/constants';

export const createRoute = async (
	routerConfig: Record<ERouterConfig, string>,
	routerFilePath: string,
	isRouterExist: boolean
) => {
	const { RouterName, PagePath, RouterType } = routerConfig,
		pageName = getNameFromPath(PagePath),
		templateConfig = {
			RouterPath: RouterName,
			RouterName: KebabCase(RouterName),
			PageName: pageName,
			ChunkName: pageName.toLowerCase(),
			EnumPageName: KebabCase(RouterName) + pageName,
			PagePath: PagePath.replace(/\.tsx$/, ''),
			RouterType,
		};
	if (isRouterExist) {
		templateConfig.RouterPath = routerConfig.RouterPath;
		let fileContent = readFileSync(routerFilePath, 'utf-8');
		fileContent = parseRoute(fileContent, templateConfig);
		writeFileSync(routerFilePath, fileContent, 'utf-8');
	} else {
		await parseTemplate({
			from: routerTemplatePath,
			to: resolve(RouteTargetPath, RouterName) + '.ts',
			setting: templateConfig,
		});
	}

	normalLog(`> 路由创建成功：${routerFilePath}`);
	lineSpaceLog();
};
