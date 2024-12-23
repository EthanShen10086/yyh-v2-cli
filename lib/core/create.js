const { createProjectAction, createComponentsAction } = require('./actions');

const createCommandList = (program) => {
	// [others...] 可变长参数
	program
		.command('create <project> [others...]')
		.description('clone a repository into a folder')
		.action(createProjectAction);

	// https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%e5%a3%b0%e6%98%8e-program-%e5%8f%98%e9%87%8f
	const options = program.opts();
	if (options.dest) {
		console.log(options.dest);
	}
	// 用法 add Comp -d /path
	program
		.command('addcomp <name>')
		.description('add a vue component')
		.action((name) => {
			createComponentsAction(name, options.dest || 'src/components');
		});
};

module.exports = createCommandList;
