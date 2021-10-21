import { resolve, parse } from 'path';
import { statSync } from 'fs';

import { errorLog } from '@/log';
import { isFileExist, KebabCase } from '@/utils';

import {
	maybeFileExt,
	maybeFileName,
	RouterPagePath,
} from '@/addRoute/constants';

export const covertToTargetPath = async (path: string) => {
	path = path.replace(/^\s*\/*(.+?)\s*$/, '$1');
	let fullPagePath = resolve(RouterPagePath, path),
		isPageExist = false;
	for (let i = 0; i < maybeFileExt.length; i++) {
		isPageExist = await isFileExist(fullPagePath + maybeFileExt[i]);
		if (isPageExist) {
			path = path + maybeFileExt[i];
			fullPagePath = fullPagePath + maybeFileExt[i];
			const state = statSync(fullPagePath);
			// 目录
			if (state.isDirectory()) {
				isPageExist = false;
				for (let j = 0; j < maybeFileName.length; j++) {
					isPageExist = await isFileExist(
						resolve(fullPagePath, maybeFileName[j])
					);
					if (isPageExist) {
						path = path + '/' + maybeFileName[j];
						fullPagePath = resolve(fullPagePath, maybeFileName[j]);
						break;
					}
				}
			}
			break;
		}
	}

	if (!isPageExist) {
		path = '';
		errorLog(`页面 ${fullPagePath} 不存在`);
	}
	return path;
};

export const getNameFromPath = (path: string) => {
	let { dir, name } = parse(path);
	// 如果name是index则过滤
	name = name === 'index' ? '' : `-${name}`;
	dir = dir.replace(/\//g, '-');

	return KebabCase(dir + name);
};
