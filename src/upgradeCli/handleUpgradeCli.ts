import { spawn } from 'child_process';
import { errorLog, successLog } from '@/log';

export const handleUpgradeCli = async () => {
	const cmd = spawn('npm', ['install', '@breathlessway/potato-cli', '-g'], {
		stdio: [0, 1, 2],
	});
	//子进程所有输入/输出终止时，会触发子进程的 'close' 事件
	cmd.on('close', code => {
		//当父进程关闭子进程时，signal表示父进程发送给子进程的信号名称
		if (code === 0) {
			successLog('升级成功！');
		} else {
			errorLog('升级失败，请重试！');
		}
	});

	//子进程出错时，触发
	cmd.on('error', () => {
		errorLog('升级失败，请重试！');
	});
};
