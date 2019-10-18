const vscode = require('vscode')

const Insert = require('../libs/insert')
const getConfig = require('../config/get')
const { getLanguageConfig } = require('../config/language')

let insert = vscode.commands.registerCommand('extension.insert', function() {
    vscode.window
    .showInputBox({
      // 调出输入框
      prompt: getLanguageConfig().INSERT_INPUT
    })
    .then(function(input) {
      if (!input) return

      const config = getConfig().snippets,
        tip = input.split(' ')

      var insert = new Insert(config[tip])
      insert.init().then(msg => {
        vscode.window.showInformationMessage(msg)
      })
    
    })
})

module.exports = insert
