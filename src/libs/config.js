const vscode = require('vscode')

function getConfig() {
    const configuration = vscode.workspace.getConfiguration('tcli')  //用户配置信息
    const template = configuration.template,
        snippets = configuration.snippets
    return function() {
        return {
            template,
            snippets
        }
    }
}

module.exports = getConfig()