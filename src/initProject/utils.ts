import { basename, join, parse } from 'path';
import { rename } from 'fs';

import shell from 'shelljs';

export const getProjectPath = (directoryName: string) => {
	return join(process.cwd(), directoryName);
};

export const copyDirectory = (source: string, target: string) => {
	const sourceBasename = basename(source),
		{ dir: targetDir } = parse(target),
		targetTempPath = join(targetDir, sourceBasename);

	shell.cp('-Rf', source, targetDir);

	return new Promise<void>((resolve, reject) => {
		rename(targetTempPath, target, err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
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
