import chalk from 'chalk';

export const normalChalk = (text: string) => chalk.bold.blue(text);

export const successChalk = (text: string) => chalk.bold.green(text);

export const warningChalk = (text: string) => chalk.bold.yellow(text);

export const questionChalk = (text: string) => chalk.cyan(text);

export const errorChalk = (text: string) => chalk.bold.red(text);

export const lineSpaceLog = () => {
	console.log('');
};

export const normalLog = (text: string) => {
	console.log(normalChalk(text));
};

export const warningLog = (text: string) => {
	console.log(warningChalk(text));
};

export const successLog = (text: string) => {
	console.log(successChalk(text));
};

export const configLog = (config: Record<string, any>) => {
	const configDetail = chalk.yellow(
		JSON.stringify(
			config,
			(key, value) => {
				return value || null;
			},
			'  '
		)
	);
	console.log(configDetail);
};

export const errorLog = (text: string) => {
	console.log(errorChalk(text));
};
