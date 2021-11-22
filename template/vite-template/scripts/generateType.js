const yargs = require('yargs/yargs'),
	{ hideBin } = require('yargs/helpers'),
	{ loadEnv } = require('vite'),
	shelljs = require('shelljs'),
	argv = yargs(hideBin(process.argv)).argv;

const root = process.cwd();

const env = loadEnv(argv.mode, root);

const API = {
	url: env.VITE_APP_BASE_URL + '/graphql',
};

shelljs.exec(
	`apollo-codegen introspect-schema ${API.url} --output schema.json`
);
shelljs.exec(
	`apollo-codegen generate src/apis/**/*.graphql --schema schema.json --target typescript --output src/apis/type.ts`
);
