import { access, constants, rm } from 'fs';

import inquirer from 'inquirer';

import * as memFs from 'mem-fs';
import * as editor from 'mem-fs-editor';

import { errorChalk, errorLog, lineSpaceLog, normalLog } from '@/log';

import { Override, ProjectSrcPath } from '@/constants';

// macos和windows是忽略文件大小写的
export const isFileExist = (path: string) =>
	new Promise<boolean>(resolve => {
		access(path, constants.F_OK, err => {
			resolve(Boolean(!err));
		});
	});

export const isDirExist = async (dirPath: string, tips: string) => {
	const isSrcExist = await isFileExist(dirPath);
	if (!isSrcExist) {
		throw tips;
	}
};

export const isProjectSrcPathExist = async () =>
	isDirExist(ProjectSrcPath, '入口src目录不存在，目前仅支持src作为入口');

export const deleteFile = (path: string) => {
	return new Promise<void>((resolve, reject) => {
		rm(path, { recursive: true, force: true }, err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
};

export const parseTemplate = ({
	from,
	to,
	setting,
}: {
	from: string;
	to: string;
	setting: Record<string, any>;
}) => {
	const fs = editor.create(memFs.create());

	return new Promise<void>((resolve, reject) => {
		fs.copyTpl(from, to, setting);

		fs.commit(err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

export const parseAndDeleteTemp = async ({
	from,
	to,
	setting,
}: {
	from: string;
	to: string;
	setting: Record<string, any>;
}) => {
	await parseTemplate({
		from,
		to,
		setting,
	});
	await deleteFile(from);
};

export const logErrorAndExit = (text: string) => {
	errorLog(text);
	process.exit();
};

export const overrideQuestion = [
	{
		type: 'confirm',
		name: Override,
		message: errorChalk('当前已存在同名文件，是否删除原文件?'),
		default: false,
	},
];

export const validFile = async (filePath: string) => {
	const exist = await isFileExist(filePath);

	if (exist) {
		const override = await inquirer.prompt(overrideQuestion);
		if (override[Override]) {
			normalLog('> 正在删除原文件...');
			await deleteFile(filePath);
			normalLog('> 删除原文件成功');
		} else {
			throw '请更换文件名称，或删除已存在的文件后重试';
		}
		lineSpaceLog();
	}
};

const KEBAB_REGEX = /[\w\u00C0-\u00D6\u00D8-\u00DE]/g,
	REVERSE_REGEX = /-[\w\u00E0-\u00F6\u00F8-\u00FE]/g,
	K_REGEX = /^[a-z\u00E0-\u00F6\u00F8-\u00FE]/;

export const kebabCase = (str: string) =>
	str.replace(KEBAB_REGEX, match => '-' + match.toLowerCase());

export const camelCase = (str: string) =>
	str.replace(REVERSE_REGEX, match => match.slice(1).toUpperCase());

export const KebabCase = (str: string) => {
	const _str = camelCase(str);
	return _str.replace(K_REGEX, match => match.toUpperCase());
};
