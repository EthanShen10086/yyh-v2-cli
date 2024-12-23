const helpOptions = (program) => {
	// 这里的<dest>就是传入的指令的变量
	program.option(
		'-d, --dest <dest>',
		'a destination folder, 例如: -d /src/components'
	);
	program.on('--help', () => {
		console.log('-- help info --');
	});
};

module.exports = helpOptions;
