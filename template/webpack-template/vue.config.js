const path = require('path');

const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('./package.json');

const srcPath = path.join(__dirname, 'src');

const addLessResource = rule => {
	rule
		.use('style-resources-loader')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(srcPath, 'assets/styles/mixins/*.less'),
				path.resolve(srcPath, 'assets/styles/variable/*.less'),
			],
		});
};

const addScssResource = rule => {
	rule
		.use('style-resources-loader')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(srcPath, 'assets/styles/mixins/*.scss'),
				path.resolve(srcPath, 'assets/styles/variable/*.scss'),
			],
		});
};

module.exports = {
	publicPath: `/${packageJson.path}/`,
	lintOnSave: false,
	devServer: {
		host: '0.0.0.0',
		open: true,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_BASE_URL,
				preserveHeaderKeyCase: true,
				changeOrigin: true, // 是否跨域
				secure: false,
				onProxyReq: function (proxyReq) {
				},
			},
		},
	},
	pluginOptions: {
		lintStyleOnBuild: false,
		dll: {
			// 入口配置
			entry: ['./src/element.ts', 'vue', 'vue-router', 'vuex', 'dayjs'],
			// 输出目录
			output: path.join(__dirname, './dll'),
			open: process.env.NODE_ENV === 'production',
			cacheFilePath: path.resolve(__dirname, './dll'),
			inject: false,
		},
	},
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 错误监控上报映射 source-map
			config.devtool('hidden-source-map');
			// 清除无用css
			config.plugin('purgeCSS').use(PurgeCSSPlugin, [
				{
					paths: glob.sync(`${srcPath}/**/*`, { nodir: true }),
				},
			]);
		}
		config.plugins.delete('prefetch');

		process.env.SPEED_MEASURE &&
			config
				.plugin('speed-measure-webpack-plugin')
				.use(SpeedMeasurePlugin)
				.end();

		process.env.ANALYZE &&
			config
				.plugin('webpack-bundle-analyzer')
				.use(BundleAnalyzerPlugin)
				.end();

		// 每个文件引入公共文件
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
		types.forEach(type => {
			addLessResource(config.module.rule('less').oneOf(type));
			addScssResource(config.module.rule('scss').oneOf(type));
		});
	},
};