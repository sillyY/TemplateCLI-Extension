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
const path = require("path");
const explorerNodeManager_1 = require("./explorerNodeManager");
const shared_1 = require("../../shared");
class TemplateTreeDataProvider {
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
            yield explorerNodeManager_1.explorerNodeManager.refreshCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield explorerNodeManager_1.explorerNodeManager.updateCache();
            this.onDidChangeTreeDataEvent.fire();
        });
    }
    getChildren(element) {
        if (!element) {
            return explorerNodeManager_1.explorerNodeManager.getRootNodes();
        }
        if (element.isLanguage) {
            switch (element.id) {
                case shared_1.Language.All:
                    return explorerNodeManager_1.explorerNodeManager.getAllNodes();
                case shared_1.Language.CSS:
                    return explorerNodeManager_1.explorerNodeManager.getCategoryNodes(shared_1.Language.CSS.toLowerCase());
                case shared_1.Language.JavaScript:
                    return explorerNodeManager_1.explorerNodeManager.getCategoryNodes(shared_1.Language.JavaScript.toLowerCase());
                default:
                    return [];
            }
        }
        if (element.isCategory) {
            return explorerNodeManager_1.explorerNodeManager.getTemplateNodes(element.language, element.category);
        }
        return [];
    }
    test() {
        console.log(this.context);
    }
    getTreeItem(element) {
        return {
            label: element.isSlug ? `[${element.id}] ${element.name}` : element.name,
            collapsibleState: element.slug
                ? vscode.TreeItemCollapsibleState.None
                : vscode.TreeItemCollapsibleState.Collapsed,
            command: element.slug ? element.insertCommand : undefined,
            iconPath: this.parseIconPathFromProblemState(element)
        };
    }
    parseIconPathFromProblemState(element) {
        if (!element.isSlug) {
            return "";
        }
        switch (element.state) {
            case shared_1.TemplateState.Install:
                return this.context.asAbsolutePath(path.join("resources", "check.png"));
            case shared_1.TemplateState.NotInstall:
                return this.context.asAbsolutePath(path.join("resources", "warning.png"));
            case shared_1.TemplateState.Unknown:
                return this.context.asAbsolutePath(path.join("resources", "blank.png"));
            default:
                return "";
        }
    }
}
exports.TemplateTreeDataProvider = TemplateTreeDataProvider;
exports.templateTreeDataProvider = new TemplateTreeDataProvider();
//# sourceMappingURL=TemplateTreeDataProvider.js.map