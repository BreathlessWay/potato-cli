import inquirer from 'inquirer';

import shell from 'shelljs';

import { projectQuestions } from '@/initProject/questions';
import { createProject } from '@/initProject/createProject';

import { configLog, lineSpaceLog, normalLog } from '@/log';
import { calcTemplatePath, logErrorAndExit } from '@/utils';

import { EProjectType } from '@/constants';
import { EProjectCli, EProjectConfig } from '@/initProject/constants';

export const handleInitProject = async (projectName: string) => {
	projectName = projectName.trim();
	if (!shell.which('git')) {
		logErrorAndExit('创建项目需要依赖git，请先安装git');
	}

	normalLog('> 配置项目：');

	const projectConfig =
		(await inquirer.prompt<Record<EProjectConfig, string>>(projectQuestions)) ||
		{};

	projectConfig[EProjectConfig.ProjectName] = projectName;
	normalLog('\n> 项目配置信息:');
	configLog(projectConfig);
	lineSpaceLog();

	calcTemplatePath(
		projectConfig[EProjectConfig.ProjectType] as EProjectType,
		projectConfig[EProjectConfig.ProjectCli] as EProjectCli
	);
	await createProject(projectConfig);
};
