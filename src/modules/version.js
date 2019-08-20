const vscode = require('vscode')
const pack = require('../../package.json')

const getVersion = vscode.commands.registerCommand(
    'extension.version',
    function() {
        vscode.window.showInformationMessage(`version: ${pack.version}`)
    }
  )

module.exports = getVersion
