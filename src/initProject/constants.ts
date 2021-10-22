import { resolve } from 'path';

export enum EProjectConfig {
	ProjectName = 'ProjectName',
	Author = 'Author',
	Description = 'Description',
	CSS = 'CSS',
	ProjectType = 'ProjectType',
	ProjectCli = 'ProjectCli',
}

export enum ECss {
	Scss = 'scss',
	Less = 'less',
}

export enum EProjectType {
	WEB = 'web',
	MOBILE = 'mobile',
}

export enum EProjectCli {
	WEBPACK = 'webpack',
	VITE = 'vite',
}

export const WebpackTemplateDir = resolve(
	__dirname,
	'../../template/webpack-template'
);

export const ViteTemplateDir = resolve(
	__dirname,
	'../../template/vite-template'
);

export const HtmlTemplatePath = {
	[EProjectCli.WEBPACK]: {
		[EProjectType.MOBILE]: 'public/index.mobile.html',
		[EProjectType.WEB]: 'public/index.web.html',
		target: 'public/index.html',
	},
	[EProjectCli.VITE]: {
		[EProjectType.MOBILE]: 'index.mobile.html',
		[EProjectType.WEB]: 'index.web.html',
		target: 'index.html',
	},
};

export const FileNeedRemove = {
	[EProjectType.WEB]: [
		HtmlTemplatePath[EProjectCli.WEBPACK][EProjectType.MOBILE],
		HtmlTemplatePath[EProjectCli.VITE][EProjectType.MOBILE],
		'src/assets/styles/mixins/hairline.less',
		'src/assets/styles/mixins/hairline.scss',
		'src/assets/styles/mixins/global.hairline.less',
		'src/assets/styles/mixins/global.hairline.scss',
	],
	[EProjectType.MOBILE]: [
		HtmlTemplatePath[EProjectCli.WEBPACK][EProjectType.WEB],
		HtmlTemplatePath[EProjectCli.VITE][EProjectType.WEB],
	],
};
