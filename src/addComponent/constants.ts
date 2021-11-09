import { resolve } from 'path';
import { CommonTemplateDir } from '@/constants';

export enum EComponentConfig {
	ComponentName = 'ComponentName',
	ComponentPathPrefix = 'ComponentPathPrefix',
	ComponentPath = 'ComponentPath',
	ComponentType = 'ComponentType',
	ComponentCssModule = 'ComponentCssModule',
}

export enum EComponentPathPrefix {
	pages = 'pages',
	templates = 'templates',
	organisms = 'organisms',
	molecules = 'molecules',
	atoms = 'atoms',
}

export enum EComponentType {
	SFC = 'SFC',
	TSX = 'TSX',
}

export const ComponentNameRegex = /^[a-zA-Z-]+$/;

export const componentTemplatePath = resolve(
	CommonTemplateDir,
	'component/component.sfc.ejs'
);

export const componentScriptPath = resolve(
	CommonTemplateDir,
	'component/component.tsx.ejs'
);
