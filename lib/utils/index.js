const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const renderFilePromise = promisify(ejs.renderFile);
const compile = async (templateName, data) => {
	const templatePosition = `../templates/${templateName}`;
	const templatePath = path.resolve(__dirname, templatePosition);
	try {
		// renderFilePromise 第三个参数传空对象就行
		const result = await renderFilePromise(templatePath, { data }, {});
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const writeFileToPath = (targetPath, content) => {
	return fs.promises.writeFile(targetPath, content);
};

// 给定一个路径 /source/components/xxx
const createDirSync = (pathName) => {
	if (fs.existsSync(pathName)) {
		return true;
	} else {
		//  path.dirname 即去掉文件名或路径的最后一部分后，返回剩下的目录路径。
		// 即判断父路径是否存在
		if (createDirSync(path.dirname(pathName))) {
			// 创建目录 "source"
			// 创建目录 "source/components"
			// 创建目录 "source/components/xxx"
			fs.mkdirSync(pathName);
			return true;
		}
	}
};

module.exports = {
	compile,
	writeFileToPath,
	createDirSync,
};
