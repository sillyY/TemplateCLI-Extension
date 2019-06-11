const vscode = require('vscode')

const tcli = require('./tcli')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.create',
    function() {
      vscode.window
        .showInputBox({
          // 调出输入框
          prompt:
            '输入框架、文件路径和文件名. 格式: <框架> <文件路径> [文件名(不带格式)...]'
        })
        .then(function(input) {
          if (!input) return
          
          let [frame, path, ...filenames] = input.split(' '),
          configuration = vscode.workspace.getConfiguration('tcli')  //用户配置信息

          const template = configuration.template,
            { root, type } = template[frame],
            rootPath = vscode.workspace.rootPath

          tcli.init(root, filenames, `${rootPath}/${path}`, type).then(msg => vscode.window.showInformationMessage(msg))
        })
    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

module.exports = {
  activate
}
