const vscode = require('vscode');

const log = console.log

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.createReact', function () {
		let fileConfig;
		vscode.window.showInputBox({  // 调出输入框
            prompt: "输入文件路径和文件名. 格式: <文件路径> [文件名...]"
        }).then(function (input) {
			let [path, ...filenames] = input.split(' ')
			fileConfig = {
				path,
				filenames
			}
			log(fileConfig)

			let value = vscode.workspace.getConfiguration('tcli')
			log(JSON.stringify(value))
			vscode.window.showInformationMessage('文件创建成功');
		});
		
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
