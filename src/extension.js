const create = require('./modules/add')
const getVersion = require('./modules/version')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(create, getVersion)
}
exports.activate = activate

module.exports = {
  activate
}
