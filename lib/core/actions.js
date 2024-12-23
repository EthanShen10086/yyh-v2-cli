const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const { vueRepo } = require('../config/repo-config');
const { commandSpawn, commandSpawn2 } = require('../utils/terminal');
const open = require('open');
const { compile, writeFileToPath } = require('../utils');
const path = require('path');

const createProjectAction = async (project, others) => {
	// 1. git clone 项目
	// 这里的project其实是用户输入的项目名称即文件夹名称 比如 vue create XXX 这里的 XXX
	// 这里的clone参数是指 要不要把项目的.git信息啊什么都给下载下来
	await download(vueRepo, project, { clone: true });
	// 2. 执行npm install
	// const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
	// win64的电脑 直接使用pnpm不会报错
	await commandSpawn('pnpm', ['install'], { cwd: `./${project}` });
	// 3. 执行run serve
	// 因为run serve会一直跑 所以我们这里不再等待 而是直接open
	const serveProcess = commandSpawn2('pnpm', ['run', 'serve'], {
		cwd: `./${project}`,
	});
	// 监听标准输出，捕获网页地址
	serveProcess.stdout.on('data', (data) => {
		const output = data.toString();
		const match = output.match(/http:\/\/localhost:\d+/); // 正则匹配 localhost 地址
		if (match) {
			const url = match[0];
			console.log(`Opening browser at ${url}`);
			open(url); // 打开匹配的地址
		}
	});

	// 监听标准错误
	serveProcess.stderr.on('data', (data) => {
		console.error(`Error: ${data.toString()}`);
	});

	// 监听进程结束事件
	serveProcess.on('close', (code) => {
		console.log(`pnpm run serve process exited with code ${code}`);
	});
};
const createComponentsAction = async (name, dest) => {
	// 1. 编译ejs模板
	const result = await compile('vue-component.ejs', { name });
	// 2. 写入文件
	const targetPath = path.resolve(dest, `${name}.vue`);
	console.log(targetPath, '== targetPath ==');
	// writeFileToPath(targetPath, result);
};
module.exports = {
	createProjectAction,
	createComponentsAction,
};
