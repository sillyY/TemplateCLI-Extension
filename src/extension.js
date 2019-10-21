const add = require('./modules/add')
const remove = require('./modules/remove')
const insert = require('./modules/insert')
const clone = require('./modules/clone')
const getVersion = require('./modules/version')
const lan  = require('./modules/language')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(add, remove, insert, clone, getVersion, lan)
}
exports.activate = activate

module.exports = {
  activate
}
