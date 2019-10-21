const vscode = require('vscode')
const Add = require('../libs/add')
const getConfig = require('../config/get')
const { getLanguage } = require('../config/language')

let add = vscode.commands.registerCommand('extension.add', function() {
  vscode.window
    .showInputBox({
      // 调出输入框
      prompt: getLanguage().ADD_INPUT
    })
    .then(function(input) {
      if (!input) return

      const template = getConfig().template

      let [frame, path, ...filenames] = input.split(' ')

      const { root, type, mark } = template[frame],
        rootPath = vscode.workspace.rootPath
      
      const add = new Add({
        root,
        filenames,
        destPath: `${rootPath}/${path}`,
        type,
        mark
      })
      add.init().then(msg => vscode.window.showInformationMessage(msg))
    })
})

module.exports = add
