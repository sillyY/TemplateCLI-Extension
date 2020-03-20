import {
  TreeDataProvider,
  Disposable,
  EventEmitter,
  Event,
  window,
  TreeView,
  TreeItem,
  commands
} from "vscode";
import { ViewNode } from "./viewNode";
import { Container } from "../container";
import { FileNode, FolderNode } from "./nodes";

export class TemplateView implements TreeDataProvider<ViewNode>, Disposable {
  protected _onDidChangeTreeData = new EventEmitter<ViewNode>();
  get onDidChangeTreeData(): Event<ViewNode> {
    return this._onDidChangeTreeData.event;
  }

  private _root: FolderNode;
  get root() {
    return this._root;
  }

  protected _disposable: Disposable | undefined;
  protected _tree: TreeView<ViewNode> | undefined;

  constructor(public readonly id: string, root?: FolderNode) {
    if (root !== void 0) {
      this._root = root;
    }

    this.registerCommands();
    this.initialize("explorer");
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }

  initialize(container?: string, options: { showCollapseAll?: boolean } = {}) {
    if (this._disposable) {
      this._disposable.dispose();
      this._onDidChangeTreeData = new EventEmitter<ViewNode>();
    }

    this._tree = window.createTreeView(
      `${this.id}${container ? `:${container}` : ""}`,
      {
        ...options,
        treeDataProvider: this
      }
    );

    this._disposable = Disposable.from(this._tree);
  }

  private registerCommands() {
    commands.registerCommand(
      `${this.id}.insert`,
      (node: FileNode) => {
        this.onInsert(node);
      },
      this
    );
    commands.registerCommand(`${this.id}.edit`, (node: FileNode) => {
      this.onEdit(node);
    });
    commands.registerCommand(
      `${this.id}.rename`,
      (node: FileNode | FolderNode) => {
        this.onRename(node);
      }
    );
    commands.registerCommand(
      `${this.id}.delete`,
      (node: FileNode | FolderNode) => {
        this.onDelete(node);
      }
    );
    commands.registerCommand(`${this.id}.settings`, () => {
      this.openSettingsView();
    });
  }

  private getRoot() {
    if (this._root === void 0) {
      this._root = new FolderNode(this, Container.configuration.appFolder());
    }

    return this.root;
  }

  getChildren(node?: ViewNode): ViewNode[] | Promise<ViewNode[]> {
    if (node !== void 0) return node.getChildren();

    const root = this.getRoot();
    return root.getChildren();
  }

  getTreeItem(node: ViewNode): TreeItem | Promise<TreeItem> {
    return node.getTreeItem();
  }

  private onInsert(node: FileNode) {
    return node.triggerInsert();
  }
  private onEdit(node: FileNode) {
    return node.triggerEdit();
  }
  private onRename(node: FileNode | FolderNode) {
    return node.triggerRename();
  }

  private onDelete(node: FileNode | FolderNode) {
    return node.triggerDelete();
  }

  triggerNodeChange() {
    this._onDidChangeTreeData.fire();
  }

  private async openSettingsView() {
    await commands.executeCommand("template.view.showSettings");
  }
}
