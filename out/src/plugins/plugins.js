"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as cp from 'child_process'
const fileUtils_1 = require("../utils/fileUtils");
class Plugin {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.fid = data.fid;
        this.slug = data.slug;
        this.state = data.state;
        this.language = data.language;
    }
    static init() {
    }
    static copy() {
    }
    static install() {
        // 1. find installed plugins
        let installed = [];
        for (let f of fileUtils_1.file.listCodeDir('lib/plugins')) {
        }
    }
    init() {
        this.next = null;
    }
    setNext(next) {
        Object.setPrototypeOf(this, next);
        this.next = next;
    }
    delete() { }
    save() { }
    install() { }
}
exports.default = Plugin;
//# sourceMappingURL=plugins.js.map