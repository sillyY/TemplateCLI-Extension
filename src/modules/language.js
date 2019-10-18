const vscode = require('vscode')
const { ALL_LANGUAGE } = require('../config/language')

const lan = vscode.commands.registerCommand('extension.lan', async () => {
    const lans = ALL_LANGUAGE.keys()
    let res = await vscode.window.showQuickPick(lans)
    if(!res) return
})

module.exports = lan