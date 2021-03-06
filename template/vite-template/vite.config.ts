import { resolve } from 'path';

import { UserConfig, ConfigEnv, loadEnv, Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import html from 'vite-plugin-html';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可
import styleImport from 'vite-plugin-style-import';
import globalStyle from './scripts/vite-plugin-global-style';

import { visualizer } from 'rollup-plugin-visualizer';

import packageJson from './package.json';

const projectSourcePath = resolve(__dirname, './src');

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();

	const env = loadEnv(mode, root);

	const isBuild = command === 'build';

	const analyze = process.env.ANALYZE;

	console.log(env);

	return {
		base: `/${packageJson.path}/`,
		publicDir: 'public',
		clearScreen: false,
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `$pre-color: red;`,
				},
				less: {
					modifyVars: ``,
					javascriptEnabled: true,
				},
			},
		},
		server: {
			port: 8080,
			open: true,
			proxy: {
				'/api': {
					target: 'http://jsonplaceholder.typicode.com',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			target: 'es2015',
			outDir: 'dist',
			// Turning off brotliSize display can slightly reduce packaging time
			brotliSize: false,
			chunkSizeWarningLimit: 2000,
			terserOptions: {
				compress: {
					// Drop only console.logs but leave others
					pure_funcs: ['console.log'],
				},
			},
		},
		resolve: {
			alias: {
				'@': projectSourcePath,
			},
		},
		plugins: [
			vue(),
			vueJsx({
				// options are passed on to @vue/babel-plugin-jsx
			}),
			isBuild &&
				legacy({
					additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
				}),
			checker({
				typescript: true,
				vueTsc: true,
				eslint: {
					files: ['./src'],
					extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
				},
			}),
			viteCommonjs(),
			globalStyle({
				sourcePath: 'src/assets/styles',
			}) as Plugin,
			html({}),
			styleImport({
				libs: [
					{
						libraryName: 'vant',
						esModule: true,
						resolveStyle: name => {
							return `vant/es/${name}/style`;
						},
					},
				],
			}),
			(isBuild &&
				analyze &&
				visualizer({
					filename: './node_modules/.cache/visualizer/stats.html',
					template: 'sunburst',
					open: true,
					gzipSize: true,
					brotliSize: true,
				})) as Plugin,
		],
	};
};
