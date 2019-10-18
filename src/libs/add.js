const fs = require('fs')
const vscode = require('vscode')
const mkdirp = require('mkdirp')

const { getLanguageConfig } = require('../config/language')

const getDirName = require('path').dirname

class Add {
  constructor(opts) {
    const {
      root,
      filenames,
      destPath,
      type, 
      mark
    } = opts;
    this.root = root;
    this.filenames = filenames;
    this.destPath = destPath;
    this.type = type;
    this.mark = mark;
  }
  /**
   * 执行函数
   * @param path {String} 模板文件路径
   * @param filenames {Array} 目标文件数组
   * @param destPath {String} 目标文件路径
   * @param type {String} 目标文件格式(可配置)
   */
  init() {
    return new Promise(async (resolve, reject) => {
      try {
        // 获取模板
        let template = await this.getTemplate()
        
        // 生成模板
        let promises = this.filenames.map(name => {
          let content = this.handleTemplate(template, name)
          return this.generate(`${this.destPath}/${name}${this.type}`, content)
        })
        await Promise.all(promises)
        resolve(getLanguageConfig().ADD_SUCCESS)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 获取模板
   * @param path {String} 模板文件路径
   */
  getTemplate() {
    return new Promise((resolve, reject) => {
      vscode.workspace.openTextDocument(this.root).then(document => {
        resolve(document.getText())
      }).catch(err=> {
        reject(err)
      })
    })
  }

  /**
   * 调整模板文件数据
   * @param template {String} 模板数据
   * @param filename {filename} 目标文件文件名
   */
  handleTemplate(template, filename) {
    if(!this.mark || !this.mark.length) return template
    const reg = new RegExp(this.mark, 'g');
    return template.replace(
      reg,
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

module.exports = Add
