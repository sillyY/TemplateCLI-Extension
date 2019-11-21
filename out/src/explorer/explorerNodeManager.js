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
const templateNode_1 = require("./templateNode");
const shared_1 = require("../shared");
class ExplorerNodeManager {
    dispose() { }
    refreshCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispose();
        });
    }
    getRootNodes() {
        return [
            new templateNode_1.TemplateNode(Object.assign({}, shared_1.defaultTreeNode, {
                id: shared_1.Category.All,
                name: shared_1.Category.All
            }))
            // new LeetCodeNode(Object.assign({}, defaultTreeNode, {
            //     id: Category.Difficulty,
            //     name: Category.Difficulty,
            // }), false),
            // new LeetCodeNode(Object.assign({}, defaultProblem, {
            //     id: Category.Tag,
            //     name: Category.Tag,
            // }), false),
            // new LeetCodeNode(Object.assign({}, defaultProblem, {
            //     id: Category.Company,
            //     name: Category.Company,
            // }), false),
            // new LeetCodeNode(Object.assign({}, defaultProblem, {
            //     id: Category.Favorite,
            //     name: Category.Favorite,
            // }), false),
        ];
    }
}
exports.explorerNodeManager = new ExplorerNodeManager();
//# sourceMappingURL=explorerNodeManager.js.map