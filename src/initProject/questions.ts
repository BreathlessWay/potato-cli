import { userInfo } from 'os';
import inquirer from 'inquirer';

import { questionChalk } from '@/log';

import {
	ECss,
	EProjectConfig,
	EProjectCli,
	EProjectType,
} from '@/initProject/constants';

export const projectQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'list',
		name: EProjectConfig.ProjectType,
		message: questionChalk('项目运行环境是web还是h5？'),
		choices: [EProjectType.MOBILE, EProjectType.WEB],
	},
	{
		type: 'list',
		name: EProjectConfig.ProjectCli,
		message: questionChalk('项目使用webpack还是vite？'),
		choices: [EProjectCli.WEBPACK, EProjectCli.VITE],
	},
	{
		type: 'input',
		name: EProjectConfig.Author,
		message: questionChalk('请输入项目开发者'),
		default: userInfo().username,
		validate: (input: string) => {
			if (input && input.trim()) {
				return true;
			}
			return '项目开发者必填';
		},
	},
	{
		type: 'input',
		name: EProjectConfig.Description,
		message: questionChalk('请输入项目描述'),
		default: 'vue3 program',
		validate: (input: string) => {
			if (input && input.trim()) {
				return true;
			}
			return '项目描述必填';
		},
	},
	{
		type: 'list',
		name: EProjectConfig.CSS,
		message: questionChalk('期望使用哪种css预处理器?'),
		choices: [ECss.Less, ECss.Scss],
	},
];
