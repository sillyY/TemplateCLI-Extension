"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("../commands/list");
const templateNode_1 = require("./templateNode");
const shared_1 = require("../shared");
class ExplorerNodeManager {
    constructor() {
        this.explorerNodeMap = new Map();
        this.categoryMap = new Map();
    }
    dispose() {
        this.explorerNodeMap.clear();
        this.categoryMap.clear();
    }
    refreshCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispose();
            this.setMaps(yield list_1.listTreeNodes());
        });
    }
    updateCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispose();
            this.setMaps(yield list_1.updateListTreeNodes());
        });
    }
    setMaps(treeNodes) {
        for (const treeItem of treeNodes) {
            this.explorerNodeMap.set(treeItem.language + treeItem.id, new templateNode_1.TemplateNode(treeItem));
            if (treeItem.category) {
                this.categoryMap.set(treeItem.category, new templateNode_1.TemplateNode(Object.assign({}, shared_1.defaultTreeNode, {
                    id: treeItem.category,
                    name: treeItem.category,
                    language: treeItem.language,
                    category: treeItem.category
                }, false)));
            }
        }
    }
    getRootNodes() {
        return [
            new templateNode_1.TemplateNode(Object.assign({}, shared_1.defaultTreeNode, {
                id: shared_1.Language.All,
                name: shared_1.Language.All
            }, false)),
            new templateNode_1.TemplateNode(Object.assign({}, shared_1.defaultTreeNode, {
                id: shared_1.Language.CSS,
                name: shared_1.Language.CSS
            }, false)),
            new templateNode_1.TemplateNode(Object.assign({}, shared_1.defaultTreeNode, {
                id: shared_1.Language.JavaScript,
                name: shared_1.Language.JavaScript
            }, false))
        ];
    }
    getAllNodes() {
        return Array.from(this.explorerNodeMap.values());
    }
    getCategoryNodes(language) {
        const result = [];
        for (const node of this.categoryMap.values()) {
            if (node.language === language) {
                result.push(node);
            }
        }
        return result.length ? result : this.getTemplateNodes(language);
    }
    getTemplateNodes(language, category = "") {
        const result = [];
        for (const node of this.explorerNodeMap.values()) {
            if (node.language === language && node.category === category) {
                result.push(node);
            }
        }
        return result;
    }
}
exports.explorerNodeManager = new ExplorerNodeManager();
//# sourceMappingURL=explorerNodeManager.js.map