import { resolve, parse } from 'path';

import shell from 'shelljs';
import glob from 'glob';

import { lineSpaceLog, normalLog } from '@/log';
import { deleteFile, parseAndDeleteTemp, validFile } from '@/utils';
import { copyDirectory, getProjectPath, installCmd } from '@/initProject/utils';

import { ECss, EProjectConfig } from '@/initProject/constants';

export const createProject = async (
	projectConfig: Record<EProjectConfig, string>
) => {
	const projectPath = getProjectPath(projectConfig[EProjectConfig.ProjectName]);
	await validFile(projectPath);

	normalLog('> 开始创建项目');
	await copyDirectory(process.env.TEMPLATE_DIR, projectPath);
	const templateFileList = glob.sync('**/*.ejs', {
		cwd: projectPath,
		dot: true,
	});
	await Promise.all(
		templateFileList.map(file => {
			const { dir, name } = parse(file);
			parseAndDeleteTemp({
				from: resolve(projectPath, file),
				to: resolve(projectPath, dir, name),
				setting: projectConfig,
			});
		})
	);

	let deleteFileList: Array<string> = glob.sync('**/*.template', {
		cwd: projectPath,
	});
	if (projectConfig[EProjectConfig.CSS] === ECss.Less) {
		deleteFileList = deleteFileList.concat(
			glob.sync('**/*.scss', { cwd: projectPath })
		);
	}
	if (projectConfig[EProjectConfig.CSS] === ECss.Scss) {
		deleteFileList = deleteFileList.concat(
			glob.sync('**/*.less', { cwd: projectPath })
		);
	}

	await Promise.all(
		deleteFileList.map(file => deleteFile(resolve(projectPath, file)))
	);

	normalLog('> 开始安装依赖...');
	shell.cd(projectPath);
	const cmd = installCmd();
	shell.exec('git init');
	shell.exec(cmd as string);
	shell.exec('npx prettier --write .');
	normalLog('> 创建项目成功');
	lineSpaceLog();
};
