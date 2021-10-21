module.exports = {
	root: true,
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order',
		'stylelint-config-prettier',
	],
	plugins: ['stylelint-scss'],
	rules: {
		// recommended rules
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
	},
	ignoreFiles: ['src/pages/NotFound/style.css'],
};
