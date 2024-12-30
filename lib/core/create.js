const { createProjectAction, createComponentsAction } = require('./actions');
// import inquirer from 'inquirer';

const createCommandList = (program) => {
	// [others...] 可变长参数
	program
		.command('create <project> [others...]')
		.alias('c')
		.description('clone a repository into a folder')
		.action(
			// inquirer v9+ 必须esm引入 后续大版本改造
			//命令行交互工具
			//  inquirer.prompt([
			// 	{
			// 		type: 'input',
			// 		name: 'projectName',
			// 		message: 'project name',
			// 		default: project
			// 	},
			// 	{
			// 		type: 'confirm',
			// 		name: 'isVue3',
			// 		message: '是否选择Vue3',
			// 	}
			// ]).then((answers) => {
			// 	if (checkPath(answers.projectName)) {
			// 		console.log('文件已存在')
			// 		return
			// 	}

			// 	if (answers.isVue3) {
			// 		createProjectAction(Vue3)
			// 	} else {
			// 		createProjectAction(Vue2)
			// 	}
			// })
			createProjectAction
		);

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
