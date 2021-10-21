module.exports = () => {
	return {
		plugins: {
			'postcss-preset-env': {
				autoprefixer: { grid: true },
			},
		},
	};
};
