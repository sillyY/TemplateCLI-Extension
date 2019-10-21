const vscode = require('vscode')
const { getLanguage } = require('../config/language')

class Insert {
  constructor(path) {
    this.path = path
  }
  init() {
    return new Promise(async (resolve, reject) => {
      try {
        const document = await this._loadFile()
        await this._insert(document)
        let value = getLanguage().INSERT_SUCCESS
        resolve(value)
      } catch (err) {
        reject(err)
      }
    })
  }
  async _loadFile() {
    try {
      const document = await vscode.workspace.openTextDocument(this.path)
      return document.getText()
    } catch (err) {
      throw new Error(err)
    }
  }
  _insert(content) {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      return // No open text editor
    }
    const selection = editor.selection
    editor.edit(builder => {
      builder.insert(
        new vscode.Position(selection.end.line, selection.end.character),
        content
      )
    })
  }
}

module.exports = Insert
