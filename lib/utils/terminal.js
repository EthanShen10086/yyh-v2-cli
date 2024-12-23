// exec：
// 使用shell（默认是 /bin/sh 或 cmd.exe）来执行命令。
// 命令作为字符串传递，由 shell 解析。
// 适合执行简单命令（如 ls, git status, npm install 等）。
// 执行结果会一次性返回（缓存在内存中）。限制：输出大小不能超过缓冲区限制（默认 200KB，可调整）。

// spawn：
// 直接启动子进程，不经过 shell。
// 命令和参数分开传递，更高效。
// 输出是流式返回（适合处理大量数据）。
// 更适合执行长时间运行或需要实时监控输出的命令（如 tail -f, ffmpeg）。
const { exec, spawn } = require('child_process');
const commandSpawn = (...args) => {
	return new Promise((resolve, reject) => {
		const childProcess = spawn(...args);
		// 因为我们是新开的子进程去处理信息
		// 但是我们是希望我们这个新开的子进程可以展示到主进程的
		childProcess.stdout.pipe(process.stdout);
		childProcess.stderr.pipe(process.stderr);
		childProcess.on('close', (code) => {
			if (code === 0) {
				resolve(childProcess);
			} else {
				reject(new Error(`Command failed with exit code ${code}`));
			}
		});
	});
};
const commandSpawn2 = (...args) => {
	// 直接返回子进程对象
	const childProcess = spawn(...args);

	// 输出子进程的 stdout 和 stderr 到主进程
	childProcess.stdout.pipe(process.stdout);
	childProcess.stderr.pipe(process.stderr);

	return childProcess; // 返回子进程对象
};
module.exports = {
	commandSpawn,
	commandSpawn2,
};
