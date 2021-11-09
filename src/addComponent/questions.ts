import inquirer from 'inquirer';

import { questionChalk } from '@/log';

import {
	EComponentConfig,
	EComponentPathPrefix,
	EComponentType,
} from '@/addComponent/constants';

export const componentQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'list',
		name: EComponentConfig.ComponentPathPrefix,
		message: questionChalk('请选择组件属性'),
		choices: [
			EComponentPathPrefix.pages,
			EComponentPathPrefix.templates,
			EComponentPathPrefix.organisms,
			EComponentPathPrefix.molecules,
			EComponentPathPrefix.atoms,
		],
	},
	{
		type: 'input',
		name: EComponentConfig.ComponentPath,
		message: questionChalk('请输入页面路径，默认为组件属性目录'),
		default: '/',
	},
	{
		type: 'list',
		name: EComponentConfig.ComponentType,
		message: questionChalk('请选择组件类型'),
		choices: [EComponentType.TSX, EComponentType.SFC],
	},
	{
		type: 'confirm',
		name: EComponentConfig.ComponentCssModule,
		message: questionChalk('是否开启css模块化'),
		default: true,
	},
];
