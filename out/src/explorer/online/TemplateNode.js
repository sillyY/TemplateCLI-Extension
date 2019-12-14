"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateNode {
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get name() {
        return this.data.name;
    }
    get fullname() {
        return `${this.data.name}${this.data.extname}`;
    }
    get category() {
        return this.data.category;
    }
    get description() {
        return this.data.description;
    }
    get state() {
        return this.data.state;
    }
    get language() {
        return this.data.language;
    }
    get extname() {
        return this.data.extname;
    }
    get isLanguage() {
        return !this.category && !this.description;
    }
    get isCategory() {
        return this.category && !this.description;
    }
    get isTemplate() {
        return !!this.name && !!this.description;
    }
    get insertCommand() {
        return {
            title: "Insert Code",
            command: "template.insertTemplate",
            arguments: [this]
        };
    }
}
exports.TemplateNode = TemplateNode;
//# sourceMappingURL=TemplateNode.js.map