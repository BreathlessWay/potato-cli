import inquirer from 'inquirer';

import { questionChalk } from '@/log';

import {
	EComponentConfig,
	EComponentPath,
	EComponentType,
} from '@/addComponent/constants';

export const componentQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'list',
		name: EComponentConfig.ComponentPath,
		message: questionChalk('请选择组件属性'),
		choices: [
			EComponentPath.pages,
			EComponentPath.templates,
			EComponentPath.organisms,
			EComponentPath.molecules,
			EComponentPath.atoms,
		],
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
