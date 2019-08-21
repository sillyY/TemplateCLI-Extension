const add = require('./modules/add')
const remove = require('./modules/remove')
const insert = require('./modules/insert')
const getVersion = require('./modules/version')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(add, remove, insert, getVersion)
}
exports.activate = activate

module.exports = {
  activate
}
