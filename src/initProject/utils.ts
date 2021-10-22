import { basename, join, parse } from 'path';
import { rename } from 'fs';

import shell from 'shelljs';

import {
	EProjectType,
	EProjectCli,
	WebpackTemplateDir,
	ViteTemplateDir,
} from '@/initProject/constants';

export const getProjectPath = (directoryName: string) => {
	return join(process.cwd(), directoryName);
};

export const renameFile = (source: string, target: string) =>
	new Promise<void>((resolve, reject) => {
		rename(source, target, err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});

export const copyDirectory = (source: string, target: string) => {
	const sourceBasename = basename(source),
		{ dir: targetDir } = parse(target),
		targetTempPath = join(targetDir, sourceBasename);

	shell.cp('-Rf', source, targetDir);

	return renameFile(targetTempPath, target);
};

export const installCmd = () => {
	const hasNpm = shell.which('npm'),
		npmVersion = shell.exec('npm -v', { silent: true }).toString();

	if (Number(npmVersion.split('.')?.[0]) > 6) {
		throw 'npm 版本不能高于 6.14.15，请修改后重试';
	}
	if (hasNpm) {
		return 'npm install';
	}
};

export const calcTemplatePath = (
	projectType: EProjectType,
	projectCli: EProjectCli
) => {
	if (projectCli === EProjectCli.WEBPACK) {
		process.env.TEMPLATE_DIR = WebpackTemplateDir;
	}
	if (projectCli === EProjectCli.VITE) {
		process.env.TEMPLATE_DIR = ViteTemplateDir;
	}

	if (!process.env.TEMPLATE_DIR) {
		throw '未能找到项目模板，请重试！';
	}
};
