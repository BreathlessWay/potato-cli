import { resolve } from 'path';

export const Override = 'Override';

export const ProjectSrcPath = resolve(process.cwd(), 'src');

export const ProjectPackageJson = resolve(process.cwd(), 'package.json');

export const CommonTemplateDir = resolve(
	__dirname,
	'../template/common-template'
);
