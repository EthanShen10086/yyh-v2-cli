#! /usr/bin/env node
// 在用户环境变量里面找到node的路径，然后执行index.js文件
// 使用npm link【npm link 创建软连接】（pnpm link需要添加参数） 將 test-self-cli 链接到环境变量 便于后续识别

const { Command } = require('commander');
const program = new Command();
const helpOptions = require('./lib/core/help');
const createCommandList = require('./lib/core/create');

// --version -V
program.version(require('./package.json').version);
// -v
program.version(
	require('./package.json').version,
	'-v, --vers',
	'output the current version'
);

helpOptions(program);
createCommandList(program);

program.parse(process.argv);

