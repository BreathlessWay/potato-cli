import inquirer from 'inquirer';

import { createComponent } from '@/addComponent/createComponent';
import { componentQuestions } from '@/addComponent/questions';

import { configLog, lineSpaceLog, normalLog } from '@/log';
import { isProjectSrcPathExist, logErrorAndExit } from '@/utils';

import { ComponentNameRegex, EComponentConfig } from '@/addComponent/constants';

export const handleAddComponent = async (componentName: string) => {
	try {
		if (ComponentNameRegex.test(componentName)) {
			componentName = componentName.trim();
			await isProjectSrcPathExist();
			const componentConfig =
				(await inquirer.prompt<Record<EComponentConfig, string>>(
					componentQuestions
				)) || {};
			componentConfig[EComponentConfig.ComponentName] = componentName;
			normalLog('\n> 项目配置信息:');
			configLog(componentConfig);
			lineSpaceLog();
			await createComponent(componentConfig);
			return;
		}
		throw '组件名称必填，且必须为驼峰命名法或短横线分隔命名';
	} catch (e) {
		logErrorAndExit(e as string);
	}
};
