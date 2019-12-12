"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateNode {
    get insertCommand() {
        return {
            title: 'Insert Code',
            command: "template.insertTemplate",
            arguments: [this]
        };
    }
}
exports.TemplateNode = TemplateNode;
//# sourceMappingURL=TemplateNode.js.map