import { SubscribeableViewNode, ResourceType, ViewNode } from "./viewNode";
import { Disposable, TreeItem, TreeItemCollapsibleState } from "vscode";
import { OnlineNode } from "./onlineNode";
import { Container } from "../../container";
import { OnlineView } from "../onlineView";
import { OnlineModel } from "../../models/onlineModel";
import { LangModel } from "../../models/LangModel";
import { LanguageType } from "../../models/model";

export class OnlinesNode extends SubscribeableViewNode<OnlineView> {
  private _children: OnlineNode[] | undefined;

  constructor(view: OnlineView) {
    super(view);
  }
  resetChildren() {
    if (this._children === void 0) return;
    for (const child of this._children) {
      if (child instanceof OnlineNode) {
        child.dispose();
      }
    }
    this._children = undefined;
  }
  async getChildren(): Promise<ViewNode[]> {
    if (this._children === void 0) {
      this._children = [
        ...[new OnlineNode(this.view, this, new LangModel(LanguageType.ALL))],
        ...[new OnlineNode(this.view, this, new LangModel(LanguageType.CSS))],
        ...[new OnlineNode(this.view, this, new LangModel(LanguageType.JS))]
      ];
    } else {
      const libraries = this.view.library.libraries;
      if (!libraries || !libraries.length) {
        await this.view.library.fetchLibrary();
      }
      this._children = this.view.library.libraries.map(
        m => new OnlineNode(this.view, this, new OnlineModel(m))
      );
    }

    return this._children!;
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem("templates", TreeItemCollapsibleState.Expanded);
    item.contextValue = ResourceType.Templates;

    void this.ensureSubscription();

    return item;
  }

  async refresh(reset: boolean = true) {
    if (this._children === void 0) return;
    if (reset) {
      this.resetChildren();
      await this.unsubscribe();
      void this.ensureSubscription();
      return;
    }
  }

  /**
   * @description: 下载
   * @param {type}
   * @return:
   */
  downloadCommand() {}

  /**
   * @description: 同步
   * @param {type}
   * @return:
   */
  synchronizeCommand() {}

  protected subscribe() {
    // const subscriptions = [Container.git.onDidChangeRepositories(this.onRepositoriesChanged, this)];

    const subscriptions = [
      Container.template.onDidChangeTemplates(this.onTemplatesChanged, this)
    ];
    return Disposable.from(...subscriptions);
  }

  private onTemplatesChanged() {
    void this.triggerChange();
  }
}
