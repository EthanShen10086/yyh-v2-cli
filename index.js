#! /usr/bin/env node
// 在用户环境变量里面找到node的路径，然后执行index.js文件
// 使用npm link（请注意不是pnpm link） 將 test-self-cli 链接到环境变量 便于后续识别

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

