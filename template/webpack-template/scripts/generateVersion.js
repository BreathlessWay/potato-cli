const { spawn } = require('child_process'),
	yargs = require('yargs/yargs'),
	{ hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const dateFormat = function (date, fmt) {
	const o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'H+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		);
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			);
	}
	return fmt;
};

const buildDate = dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');

process.env.VITE_APP_BUILD_DATE = buildDate;

const buildScript = spawn(`npm`, ['run', `gen:${argv.mode}`]);

buildScript.stdout.on('data', data => {
	console.log(data.toString());
});

buildScript.stderr.on('data', data => {
	console.log(data.toString());
});

buildScript.on('close', code => {
	console.log(`child process exited with code ${code}`);
});
