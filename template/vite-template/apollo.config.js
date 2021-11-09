// apollo.config.js
module.exports = {
	client: {
		service: {
			// GraphQL API 的 URL
			url: 'http://xx.xx.xx.xx:xx/graphql',
		},
		// 通过扩展名选择需要处理的文件
		includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql,graphql}'],
	},
};
