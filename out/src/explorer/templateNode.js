"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateNode {
    constructor(data) {
        this.data = data;
    }
    get locked() {
        return this.data.locked;
    }
    get name() {
        return this.data.name;
    }
    get id() {
        return this.data.id;
    }
}
exports.TemplateNode = TemplateNode;
//# sourceMappingURL=templateNode.js.map