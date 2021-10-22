'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const DEFAULT_OPTIONS = {
	sourcePath: 'src/assets',
	cssEnabled: true,
	sassEnabled: true,
	lessEnabled: true,
	stylusEnabled: true,
	recursive: true,
};
const GLOBAL_STYLES_DATA = [
	{
		name: 'css',
		globalRegex: /^global.*\.css$/,
		extensionRegex: /.css(\?used)?$/,
		globalStylePaths: [],
		isEnabled: opt => {
			return opt.cssEnabled;
		},
	},
	{
		name: 'sass',
		globalRegex: /^global.*\.scss$/,
		extensionRegex: /.scss(\?used)?$/,
		globalStylePaths: [],
		isEnabled: opt => {
			return opt.sassEnabled;
		},
	},
	{
		name: 'less',
		globalRegex: /^global.*\.less$/,
		extensionRegex: /.less(\?used)?$/,
		globalStylePaths: [],
		isEnabled: opt => {
			return opt.lessEnabled;
		},
	},
	{
		name: 'stylus',
		globalRegex: /^global.*\.styl(us)?$/,
		extensionRegex: /.styl(us)?(\?used)?$/,
		globalStylePaths: [],
		isEnabled: opt => {
			return opt.stylusEnabled;
		},
	},
];

//Get the path of the desired style sheet whose name starts with 'global'
function searchGlobalStyle(rootDir, options, data) {
	let globalStylePaths = [];
	fs_1.default.readdirSync(rootDir).forEach(item => {
		const targetPath = path_1.default.resolve(rootDir, item);
		if (fs_1.default.statSync(targetPath).isDirectory() && options.recursive) {
			globalStylePaths = globalStylePaths.concat(
				searchGlobalStyle(targetPath, options, data)
			);
		} else {
			if (data.globalRegex.test(item)) {
				globalStylePaths.push(targetPath);
			}
		}
	});
	return globalStylePaths;
}

exports.default = (options = {}) => {
	const opts = Object.assign({}, DEFAULT_OPTIONS, options);
	let assetsPath;
	return {
		name: 'vite:global-style',
		enforce: 'pre',
		transformIndexHtml: {
			enforce: 'pre',
			transform(_, { filename }) {
				const HtmlTagDescriptors = [];
				if (!assetsPath) {
					assetsPath = path_1.default.resolve(filename, '..', opts.sourcePath);
				}
				GLOBAL_STYLES_DATA.forEach(data => {
					data.globalStylePaths = searchGlobalStyle(assetsPath, opts, data);
				});
				if (opts.cssEnabled) {
					// inject the global css styles to the index.html
					const cssStylesData = GLOBAL_STYLES_DATA.filter(value => {
						return value.name === 'css';
					})[0];
					const CSSFilePaths = cssStylesData.globalStylePaths;
					CSSFilePaths.forEach(filePath => {
						filePath = filePath
							.replace(assetsPath, '/' + opts.sourcePath)
							.replace(/\\/g, '/');
						HtmlTagDescriptors.push({
							tag: 'link',
							attrs: {
								rel: 'stylesheet',
								href: filePath,
							},
							injectTo: 'head',
						});
					});
					return HtmlTagDescriptors;
				}
				return [];
			},
		},
		transform(code, id) {
			let result = null;
			GLOBAL_STYLES_DATA.forEach(data => {
				// the global css has already been handled in transformIndexHtml
				if (data.name === 'css') return;
				if (
					data.extensionRegex.test(id) &&
					data.globalStylePaths.length > 0 &&
					data.isEnabled(opts)
				) {
					// inject the global styles to corresponding files
					const globalImport = data.globalStylePaths
						.map(filePath => {
							filePath = path_1.default
								.relative(path_1.default.join(id, '..'), filePath)
								.replace(/\\/g, '/');
							return `@import "${filePath}";`;
						})
						.join(' ');
					result = {
						code: `${globalImport}\n${code}`,
						map: null,
					};
				}
			});
			return result;
		},
		handleHotUpdate(ctx) {
			GLOBAL_STYLES_DATA.filter(data => {
				const baseName = path_1.default.basename(ctx.file);
				if (!data.globalRegex.test(baseName)) {
					return false;
				}
				return true;
			}).forEach(data => {
				// search again to update global style paths
				data.globalStylePaths = searchGlobalStyle(assetsPath, opts, data);
			});
		},
	};
};
//# sourceMappingURL=index.js.map
