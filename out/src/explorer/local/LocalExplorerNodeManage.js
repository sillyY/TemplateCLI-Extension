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
const list_1 = require("../../commands/list");
const LocalTemplateNode_1 = require("./LocalTemplateNode");
class LocalExplorerNodeManager {
    constructor() {
        this.explorerNodeSet = new Set();
    }
    dispose() {
        this.explorerNodeSet.clear();
    }
    refreshCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispose();
            this.setSets(yield list_1.listLocalTreeNodes());
        });
    }
    setSets(treeNodes) {
        for (const treeItem of treeNodes) {
            const [name, extname] = treeItem.name.split(".");
            treeItem.name = name;
            treeItem.extname = extname;
            this.explorerNodeSet.add(new LocalTemplateNode_1.LocalTemplateNode(treeItem));
        }
    }
    getAllNodes() {
        return Array.from(this.explorerNodeSet.values());
    }
}
exports.localExplorerNodeManager = new LocalExplorerNodeManager();
//# sourceMappingURL=LocalExplorerNodeManage.js.map