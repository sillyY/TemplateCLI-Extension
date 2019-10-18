const vscode = require('vscode')
const { ALL_LANGUAGE, setLanguage, getLanguageConfig, LANGUAGE_CURRENT } = require('../config/language')

const lan = vscode.commands.registerCommand('extension.lan', async () => {
    const lans = Object.values(ALL_LANGUAGE),
    res = await vscode.window.showQuickPick(lans)

    if(!res) return
    for(let key in ALL_LANGUAGE) {
        if(ALL_LANGUAGE[key].label === res.label) {
            setLanguage(key)
        }
    }
    const msg = getLanguageConfig().SET_LANGUAGE_SUCCESS
    vscode.window.showInformationMessage(msg)
})

module.exports = lan