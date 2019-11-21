"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateNode_1 = require("./templateNode");
class templateTreeDataProvider {
    constructor() {
        console.log('实例化tree-data-provider');
    }
    getChildren(element) {
        if (!element) {
            return [new templateNode_1.templateNode("111", 0)];
        }
        else {
            return [new templateNode_1.templateNode("222", 0), new templateNode_1.templateNode("333", 0)];
        }
    }
    getTreeItem(element) {
        return element;
    }
}
exports.templateTreeDataProvider = templateTreeDataProvider;
exports.templateTreeDataProvider = new exports.templateTreeDataProvider();
//# sourceMappingURL=tcliTreeDataProvider.js.map