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
const vscode = require("vscode");
const LocalExplorerNodeManage_1 = require("./LocalExplorerNodeManage");
// import { TemplateState } from "../../shared";
class LocalTemplateTreeDataProvider {
    constructor() {
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
        this.onDidChangeTreeData = this
            .onDidChangeTreeDataEvent.event;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield LocalExplorerNodeManage_1.localExplorerNodeManager.refreshCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    getChildren() {
        return LocalExplorerNodeManage_1.localExplorerNodeManager.getAllNodes();
    }
    getTreeItem(element) {
        return {
            label: element.name,
            command: element.insertCommand
        };
    }
}
exports.LocalTemplateTreeDataProvider = LocalTemplateTreeDataProvider;
exports.localTemplateTreeDataProvider = new LocalTemplateTreeDataProvider();
//# sourceMappingURL=LocalTemplateTreeDataProvider.js.map