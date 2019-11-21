"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class templateNode extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
    }
}
exports.templateNode = templateNode;
//# sourceMappingURL=TcliNode.js.map