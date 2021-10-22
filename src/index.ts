// Typescript 配置的 alias 不会编译成相应地址，需要配合 module-alias 在 js 中解析 alias
import 'module-alias/register';
// template路径初始化
process.env.TEMPLATE_DIR = '';

import { Command } from 'commander';

import { handleInitProject } from '@/initProject/handleInitProject';
import { handleCreateDoc } from '@/createDoc/handleCreateDoc';
import { handleUpgradeCli } from '@/upgradeCli/handleUpgradeCli';
import { handleAddComponent } from '@/addComponent/handleAddComponent';
import { handleAddRoute } from '@/addRoute/handleAddRoute';
import { handleAddStore } from '@/addStore/handleAddStore';

import { lineSpaceLog, normalChalk } from '@/log';
import { logErrorAndExit } from '@/utils';

// @ts-ignore
import packageJson from '../package.json';

const cli = new Command();
cli
	.description(normalChalk('一个用来创建基于 vue3 的 h5/web 项目的脚手架'))
	.version(packageJson.version, '-v, --version', 'mars版本信息')
	.option('-d, --doc', '查看mars文档')
	.option('-u, --upgrade', '升级mars')
	.option('-i, --init <projectName>', '创建项目')
	.option('-ac, --add-component <componentName>', '添加组件')
	.option('-ar, --add-router <routerName>', '添加路由文件')
	.option('-as, --add-store <storeName>', '添加数据集')
	.action(async (options: OptionValues, cmd: Command) => {
		const { init, doc, upgrade, addComponent, addRouter, addStore } = options;
		try {
			if (init) {
				await handleInitProject(init);
				return;
			}
			if (doc) {
				await handleCreateDoc();
				return;
			}
			if (upgrade) {
				await handleUpgradeCli();
				return;
			}
			if (addComponent) {
				await handleAddComponent(addComponent);
				return;
			}
			if (addRouter) {
				await handleAddRoute(addRouter);
				return;
			}
			if (addStore) {
				await handleAddStore(addStore);
				return;
			}
			cmd.help();
		} catch (e) {
			logErrorAndExit(e as string);
		}
	})
	.on('--help', () => {
		lineSpaceLog();
		console.log('Example call:');
		console.log('  $ mars --help');
		lineSpaceLog();
	})
	.showHelpAfterError()
	.parse(process.argv);
