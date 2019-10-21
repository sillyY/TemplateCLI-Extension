const vscode = require('vscode')
const snippets = require('../config/snippet')
const Clone = require('../libs/clone')

const clone = vscode.commands.registerCommand('extension.clone', async () => {
  const menus = Object.keys(snippets),
    selectMenu = await vscode.window.showQuickPick(menus),
    options = snippets[selectMenu],
    subMenus = Object.keys(options),
    selectSubmenu = await vscode.window.showQuickPick(subMenus),
    subOptions = snippets[selectMenu][selectSubmenu]

  // 获取显示选项
  const selectOptions = Object.values(subOptions).map(
      v => `${v.label}-${v.getDesc()}`
    ),
    selectItem = await vscode.window.showQuickPick(selectOptions)

  if (!selectItem) return
  const label = selectItem.split('-')[0]
  let path = ''

  for (let key in subOptions) {
    if (subOptions[key].label === label) {
      path = subOptions[key].path
    }
  }

  let clone = new Clone(path)
  let msg = await clone.init()
  await vscode.window.showInformationMessage(msg)
})

module.exports = clone
