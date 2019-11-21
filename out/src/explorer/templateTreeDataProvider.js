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
const explorerNodeManager_1 = require("./explorerNodeManager");
// import { Category } from "../shared";
class TemplateTreeDataProvider {
    constructor() {
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
    }
    initialize(context) {
        this.context = context;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield explorerNodeManager_1.explorerNodeManager.refreshCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    getChildren(element) {
        if (!element) {
            return explorerNodeManager_1.explorerNodeManager.getRootNodes();
        }
        console.log(this.context);
        return explorerNodeManager_1.explorerNodeManager.getRootNodes();
    }
    getTreeItem(element) {
        return {
            label: element.name
        };
    }
}
exports.TemplateTreeDataProvider = TemplateTreeDataProvider;
exports.templateTreeDataProvider = new TemplateTreeDataProvider();
//# sourceMappingURL=templateTreeDataProvider.js.map