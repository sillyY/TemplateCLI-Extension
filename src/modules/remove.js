const vscode = require('vscode')
const Remove = require('../libs/remove')
const { getLanguage } = require('../config/language')

let remove = vscode.commands.registerCommand('extension.remove', function() {
  vscode.window
    .showInputBox({
      // 调出输入框
      prompt: getLanguage().REMOVE_INPUT
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
