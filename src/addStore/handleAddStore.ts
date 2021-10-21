import { createStore } from '@/addStore/createStore';

import { lineSpaceLog } from '@/log';
import { isDirExist, isProjectSrcPathExist, logErrorAndExit } from '@/utils';

import { StoreTargetPath } from '@/addStore/constants';

export const handleAddStore = async (storeName: string) => {
	try {
		storeName = storeName.trim();
		await isProjectSrcPathExist();
		await isDirExist(
			StoreTargetPath,
			'数据集store目录不存在，目前仅支持store作为数据集目录'
		);
		lineSpaceLog();
		await createStore(storeName);
	} catch (e) {
		logErrorAndExit(e as string);
	}
};
