const fs = require('fs-extra')

class Remove{
    constructor(path, filenames) {
        this.path = path
        this.filenames = filenames
    }
    init() {
        return new Promise(async(resolve, reject) => {
            try {
                let promise = this.filenames.map(name => {
                    return this._delete(`${this.path}/${name}`)
                })
                await Promise.all(promise)
                resolve('删除成功')
            } catch (err) {
                reject(err)
            }
        })
    }
    _delete(path) {
        return new Promise(async (resolve, reject) => {
            try {
                await fs.remove(path)
                resolve()
              } catch (err) {
                reject(err)
              }
        })
    }
}

module.exports = Remove