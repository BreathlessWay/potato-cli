import { resolve } from 'path';
import inquirer from 'inquirer';

import {
	createRouterQuestions,
	addRouterQuestions,
} from '@/addRoute/questions';
import { createRoute } from '@/addRoute/createRoute';

import { configLog, lineSpaceLog, normalLog, warningLog } from '@/log';
import {
	isDirExist,
	isFileExist,
	isProjectSrcPathExist,
	logErrorAndExit,
} from '@/utils';

import { ERouterConfig, RouteTargetPath } from '@/addRoute/constants';

export const handleAddRoute = async (routerName: string) => {
	try {
		routerName = routerName.trim();
		await isProjectSrcPathExist();
		await isDirExist(
			RouteTargetPath,
			'路由router目录不存在，目前仅支持router作为路由目录'
		);
		const routerFilePath = resolve(RouteTargetPath, routerName) + '.ts',
			isRouterExist = await isFileExist(routerFilePath);

		let routerConfig = {} as Record<ERouterConfig, string>;
		if (isRouterExist) {
			warningLog('路由名称已存在，将进入添加路由流程');
			lineSpaceLog();
			routerConfig =
				(await inquirer.prompt<Record<ERouterConfig, string>>(
					addRouterQuestions
				)) || {};
		} else {
			routerConfig =
				(await inquirer.prompt<Record<ERouterConfig, string>>(
					createRouterQuestions
				)) || {};
		}
		routerConfig[ERouterConfig.RouterName] = routerName;
		normalLog('\n> 项目配置信息:');
		configLog(routerConfig);
		lineSpaceLog();
		await createRoute(routerConfig, routerFilePath, isRouterExist);
	} catch (e) {
		logErrorAndExit(e as string);
	}
};
