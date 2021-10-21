import { resolve } from 'path';

export const Override = 'Override';

export const ProjectSrcPath = resolve(process.cwd(), 'src');

export const ProjectPackageJson = resolve(process.cwd(), 'package.json');

export enum EProjectType {
	WEB = 'web',
	MOBILE = 'mobile',
}

export const WebWebpackTemplateDir = resolve(
	__dirname,
	'../template/web-webpack-template'
);

export const WebViteTemplateDir = resolve(
	__dirname,
	'../template/web-vite-template'
);

export const MobileWebpackTemplateDir = resolve(
	__dirname,
	'../template/mobile-webpack-template'
);

export const MobileViteTemplateDir = resolve(
	__dirname,
	'../template/mobile-vite-template'
);

export const CommonTemplateDir = resolve(
	__dirname,
	'../template/common-template'
);
