const fs = require('fs')
const vscode = require('vscode')
const mkdirp = require('mkdirp')

const getDirName = require('path').dirname

class Tcli {
  /**
   * 执行函数
   * @param path {String} 模板文件路径
   * @param filenames {Array} 目标文件数组
   * @param destPath {String} 目标文件路径
   * @param type {String} 目标文件格式(可配置)
   */
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
        resolve('文件创建成功')
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 获取模板
   * @param path {String} 模板文件路径
   */
  getTemplate(path) {
    return new Promise((resolve, reject) => {
      vscode.workspace.openTextDocument(path).then(document => {
        resolve(document.getText())
      })
    })
  }

  /**
   * 调整模板文件数据
   * @param template {String} 模板数据
   * @param filename {filename} 目标文件文件名
   */
  handleTemplate(template, filename) {
    return template.replace(
      /App/g,
      filename.charAt(0).toUpperCase() + filename.slice(1)
    )
  }

  /**
   * 生成目标文件
   * @param path {String} 目标文件路径
   * @param contents {String} 文件数据  
   */
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
