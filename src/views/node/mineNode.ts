import { ViewNode, SubscribeableViewNode } from "./viewNode";
import { MineView } from "../MineView";
import { IMineLibrary } from "../../library";
import { MineModel } from "../../models/MineModel";
import { Container } from "../../container";
import { Disposable } from "vscode";

export class MineNode extends SubscribeableViewNode<MineView> {
  private _children: ViewNode[] | undefined;

  private _model: MineModel | undefined;
  get model() {
    return this._model;
  }
  constructor(view: MineView, model?: MineModel) {
    super(view);
    this._model = model;
  }
  resetChildren() {
    if (this._children === void 0) return;
    for (const child of this._children) {
      if (child instanceof MineNode) {
        child.dispose();
      }
    }
    this._children = undefined;
  }
  getChildren(): ViewNode[] {
    if (this._children === void 0) {
      let children: any[] = [];

      const libraries = this.view.library.libraries;
      if (libraries && libraries.length) {
        children = libraries.map(
          (item: IMineLibrary) => new MineNode(this.view, new MineModel(item))
        );
      }
      this._children = children;
    }
    return this._children;
  }

  getTreeItem() {
    if (!this._model) return {};

    const { name, isTemplate } = this._model;
    return {
      label: name,
      command: {
        title: "Insert Template",
        command: "template.views.insert",
        arguments: [() => this.triggerInsert()]
      },
      contextValue: isTemplate ? "template" : ""
    };
  }

  private async triggerInsert() {
    /**
     * 1. 通过本地path 获取数据
     *
     * 2. 调用insertTemplateToEditor插入 数据
     */

    if (!this._model) return;

    const { path } = this._model;

    const data = this.getLocalFile(path);

    if (data) {
      this.insertTemplateToEditor(data);
    } else {
      // TODO: 抛出异常
    }
  }

  async refresh(reset: boolean = true) {
    if (this._children === void 0) return;

    if (reset) {
      this.view.library.setLibrary()
      this.resetChildren();
      await this.unsubscribe();
      void this.ensureSubscription();
      return;
    }
  }

  protected subscribe() {
    const subscriptions = [
      Container.template.onDidChangeTemplates(this.onTemplatesChanged, this)
    ];
    return Disposable.from(...subscriptions);
  }

  private onTemplatesChanged() {
    void this.triggerChange();
  }
}
