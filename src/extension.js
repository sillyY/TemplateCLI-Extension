const add = require('./modules/add')
const remove = require('./modules/remove')
const getVersion = require('./modules/version')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(add, remove, getVersion)
}
exports.activate = activate

module.exports = {
  activate
}
