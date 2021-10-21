import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { lineSpaceLog, normalLog } from '@/log';
import { KebabCase, parseTemplate, validFile } from '@/utils';

import { ProjectPackageJson, ProjectSrcPath } from '@/constants';
import {
	EComponentConfig,
	EComponentPath,
	EComponentType,
	componentScriptPath,
	componentTemplatePath,
} from '@/addComponent/constants';

export const createComponent = async (
	componentConfig: Record<EComponentConfig, string>
) => {
	const packageJson = JSON.parse(readFileSync(ProjectPackageJson, 'utf-8'));
	// eslint-disable-next-line prefer-const
	let { ComponentName, ComponentPath, ComponentType, ComponentCssModule } =
		componentConfig;

	ComponentName = KebabCase(ComponentName);
	if (ComponentPath === EComponentPath.pages) {
		ComponentPath = resolve(ProjectSrcPath, ComponentPath, ComponentName);
	} else {
		ComponentPath = resolve(
			ProjectSrcPath,
			'components',
			ComponentPath,
			ComponentName
		);
	}

	await validFile(ComponentPath);

	let scriptName = '';
	if (ComponentType === EComponentType.SFC) {
		const templateName = 'index.vue';

		scriptName = 'script.ts';

		await parseTemplate({
			from: componentTemplatePath,
			to: resolve(ComponentPath, templateName),
			setting: {
				ComponentName,
				CSS: packageJson.css,
				ComponentType,
				ComponentCssModule,
			},
		});
	}

	if (ComponentType === EComponentType.TSX) {
		scriptName = 'index.tsx';
	}
	const compScriptPath = resolve(ComponentPath, scriptName);

	await parseTemplate({
		from: componentScriptPath,
		to: compScriptPath,
		setting: {
			ComponentName,
			CSS: packageJson.css,
			ComponentType,
			ComponentCssModule,
		},
	});

	if (ComponentType === EComponentType.TSX) {
		const cssFileName = `style.${ComponentCssModule ? 'module.' : ''}${
			packageJson.css
		}`;
		writeFileSync(resolve(ComponentPath, cssFileName), '');
	}
	normalLog(`> 组件创建成功：${ComponentPath}`);
	lineSpaceLog();
};
