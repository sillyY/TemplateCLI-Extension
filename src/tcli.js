const fs = require('fs')
const vscode = require('vscode')
const mkdirp = require('mkdirp')

const getDirName = require('path').dirname,
  log = console.log

class Tcli {
  init(path, filenames, destPath, type) {
    return new Promise(async (resolve, reject) => {
      try {
        // 获取模板
        let template = await this.getTemplate(path)

        // 生成模板
        let promises = filenames.map(name => {
          let tem = this.handleTemplate(template, name)
          return this.generate(`${destPath}/${name}${type}`, tem)
        })
        await Promise.all(promises)
        
      } catch (err) {
        reject(err)
      }
    })
  }
  getTemplate(path) {
    return new Promise((resolve, reject) => {
      vscode.workspace.openTextDocument(path).then((document) => {
        resolve(document.getText());
      });
    })
  }

  handleTemplate(template, filename) {
    return template.replace(/App/g, filename.charAt(0).toUpperCase() + filename.slice(1))
  }

  generate(path, contents) {
    return new Promise((resolve, reject) => {
      mkdirp(getDirName(path), function(err) {
        if (err) return reject(err)
        fs.writeFile(path, contents, err => {
          err ? reject(err) : resolve()
        })
      })
    })
  }
}

module.exports = new Tcli()
