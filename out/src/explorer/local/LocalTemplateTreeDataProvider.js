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
// import { explorerNodeManager } from "./explorerNodeManager";
// import { TemplateState } from "../../shared";
class LocalTemplateTreeDataProvider {
    constructor() {
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
        this.onDidChangeTreeData = this
            .onDidChangeTreeDataEvent.event;
    }
    initialize(context) {
        this.context = context;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            // await explorerNodeManager.refreshCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            // await explorerNodeManager.updateCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    getChildren() {
        return [
            {
                name: "all"
            },
            {
                name: "css"
            },
            {
                name: "js"
            }
        ];
    }
    test() {
        console.log(this.context);
    }
    getTreeItem(element) {
        return {
            label: element.name
        };
    }
}
exports.LocalTemplateTreeDataProvider = LocalTemplateTreeDataProvider;
exports.localTemplateTreeDataProvider = new LocalTemplateTreeDataProvider();
//# sourceMappingURL=LocalTemplateTreeDataProvider.js.map