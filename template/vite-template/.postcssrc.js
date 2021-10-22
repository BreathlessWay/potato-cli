module.exports = {
	plugins: {
		'postcss-preset-env': {
			autoprefixer: { grid: true },
		},
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 375,
			unitPrecision: 5,
			propList: ['*', '!line-height'],
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			selectorBlackList: ['.vw-ignore'],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			exclude: void 0,
			include: void 0,
			landscape: false,
			landscapeUnit: 'vw',
			landscapeWidth: 568,
		},
		'postcss-viewport-units': {
			filterRule: rule =>
				rule.selector.indexOf('::after') === -1 &&
				rule.selector.indexOf('::before') === -1 &&
				rule.selector.indexOf(':after') === -1 &&
				rule.selector.indexOf(':before') === -1,
		},
	},
};
