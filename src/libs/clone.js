const vscode = require('vscode')
const download = require('download-git-repo')
const fs = require('fs-extra')
const path = require('path')
const { getLanguage } = require('../config/language')

class Clone {
  constructor(filepath) {
    this.DIRNAME = vscode.workspace.rootPath + '/template/'
    this.path = path.resolve(this.DIRNAME, filepath)
  }

  async init() {
    return new Promise(async (resolve, reject) => {
      try {
        await this._getData()
        const document = await this._loadFile()
        await this._insert(document)
        await this._delete()
        resolve(getLanguage().CLONE_SUCCESS)
      } catch (e) {
        reject(e)
      }
    })
  }

  _getData() {
    return new Promise((resolve, reject) => {
      download(`github:sillyY/template`, this.DIRNAME, function(err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
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
  async _delete() {
    return new Promise(async (resolve, reject) => {
      try {
        await fs.remove(vscode.workspace.rootPath + '/template')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}
module.exports = Clone
