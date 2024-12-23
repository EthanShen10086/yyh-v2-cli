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

module.exports = {
	compile,
	writeFileToPath,
};
