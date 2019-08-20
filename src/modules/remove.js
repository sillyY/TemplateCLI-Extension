const vscode = require('vscode')
const Remove = require('../libs/remove')

let remove = vscode.commands.registerCommand('extension.remove', function() {
  vscode.window
    .showInputBox({
      // 调出输入框
      prompt:
        '输入文件路径和文件名. 格式: <文件路径> [文件名...]'
    })
    .then(function(input) {
      if (!input) return


      let [path, ...filenames] = input.split(' ')

      const rootPath = vscode.workspace.rootPath
      
      const remove = new Remove(`${rootPath}/${path}`, filenames)
      remove.init().then(msg => vscode.window.showInformationMessage(msg))
    })
})

module.exports = remove
