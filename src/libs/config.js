const vscode = require('vscode')

function getConfig() {
    const configuration = vscode.workspace.getConfiguration('tcli')  //用户配置信息
    const template = configuration.template
    return function() {
        return template
    }
}

module.exports = getConfig()