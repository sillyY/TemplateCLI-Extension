"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateNode {
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get fid() {
        return this.data.fid;
    }
    get name() {
        return this.data.name;
    }
    get category() {
        return this.data.category;
    }
    get slug() {
        return this.data.slug;
    }
    get state() {
        return this.data.state;
    }
    get language() {
        return this.data.language;
    }
    get lan() {
        return this.data.lan;
    }
    get isLanguage() {
        return !this.category && !this.slug;
    }
    get isCategory() {
        return this.category && !this.slug;
    }
    get isSlug() {
        return !!this.slug;
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