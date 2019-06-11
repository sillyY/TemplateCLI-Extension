const vscode = require('vscode')

const tcli = require('./tcli')

const log = console.log

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.createReact',
    function() {
      let fileConfig, configuration
      vscode.window
        .showInputBox({
          // 调出输入框
          prompt:
            '输入框架、文件路径和文件名. 格式: <框架> <文件路径> [文件名(不带格式)...]'
        })
        .then(function(input) {
          if (!input) return
		  let [frame, path, ...filenames] = input.split(' ')
		  log(path)
          fileConfig = {
            frame,
            path,
            filenames
          }

          configuration = vscode.workspace.getConfiguration('tcli')
          const template = configuration.template,
            { root, type } = template[frame],
			rootPath = vscode.workspace.rootPath
			
          tcli.init(root, filenames, `${rootPath}/${path}`, type)
          vscode.window.showInformationMessage('文件创建成功')
        })
    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
