"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalTemplateNode {
    constructor(data) {
        this.data = data;
    }
    get name() {
        return this.data.name;
    }
    get extname() {
        return this.data.extname;
    }
    get fullname() {
        return `${this.data.name}.${this.data.extname}`;
    }
    get insertCommand() {
        return {
            title: "Insert Code",
            command: "template.insertTemplate",
            arguments: [this]
        };
    }
}
exports.LocalTemplateNode = LocalTemplateNode;
//# sourceMappingURL=LocalTemplateNode.js.map