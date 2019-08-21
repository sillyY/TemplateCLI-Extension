const vscode = require('vscode')

class Insert {
  constructor(path) {
    this.path = path
  }
  init() {
    return new Promise(async (resolve, reject) => {
      try {
        const document = await this._loadFile()
        this._insert(document)
        resolve('插入文件成功')
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
