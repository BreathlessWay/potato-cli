import inquirer from 'inquirer';

import { questionChalk } from '@/log';

import { ERouterConfig } from '@/addRoute/constants';
import { covertToTargetPath } from '@/addRoute/utils';

export const createRouterQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'input',
		name: ERouterConfig.PagePath,
		message: questionChalk('请输入页面路径，为在pages下的绝对路径'),
		validate: (input: string) => {
			if (input && input.trim()) {
				return true;
			}
			return '页面路径必填';
		},
		filter: async (input: string) => {
			return await covertToTargetPath(input);
		},
	},
	{
		type: 'confirm',
		name: ERouterConfig.RouterType,
		message: questionChalk('是否包含子路由'),
		default: true,
	},
];

export const addRouterQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'input',
		name: ERouterConfig.PagePath,
		message: questionChalk('请输入页面路径，为在pages下的绝对路径'),
		validate: (input: string) => {
			if (input && input.trim()) {
				return true;
			}
			return '页面路径必填';
		},
		filter: async (input: string) => {
			return await covertToTargetPath(input);
		},
	},
	{
		type: 'input',
		name: ERouterConfig.RouterPath,
		message: questionChalk('请输入路由地址'),
		validate: (input: string) => {
			if (input && input.trim()) {
				return true;
			}
			return '路由地址必填';
		},
		filter: (input: string) => input.replace(/^\s*\/*(.+?)\/*\s*$/, '$1'),
	},
];
