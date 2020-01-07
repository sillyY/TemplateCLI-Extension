import * as path from "path";
import { OnlineView } from "../onlineView";
import { SubscribeableViewNode, ViewNode } from "./viewNode";
import { Disposable, TreeItemCollapsibleState } from "vscode";
import { Container } from "../../container";
import { OnlineModel } from "../../model/onlineModel";
import { LangModel } from "../../model/LangModel";
import { LanguageType } from "../../model/model";
import { IOnlineLibrary } from "../../library";
import { CategoryModel } from "../../model/categoryModel";

export const REMOTE_URL =
  "https://cdn.jsdelivr.net/gh/sillyY/template-library/config.json";
export const TEMPLATE_PREFIX =
  "https://cdn.jsdelivr.net/gh/sillyY/template-library";

export class OnlineNode extends SubscribeableViewNode<OnlineView> {
  private _children: ViewNode[] | undefined;

  private _remote: string;
  get remote() {
    return this._remote;
  }

  private _prefix: string;
  get prefix() {
    return this._prefix;
  }

  private _model: OnlineModel | LangModel | CategoryModel;
  get model() {
    return this._model;
  }

  constructor(
    view: OnlineView,
    parent: ViewNode,
    model: OnlineModel | LangModel | CategoryModel
  ) {
    super(view, parent);

    this._model = model;

    this._remote = REMOTE_URL;
    this._prefix = TEMPLATE_PREFIX;
  }

  async getChildren(): Promise<ViewNode[]> {
    if (this._children === void 0) {
      let children: any[] = [];

      const libraries = this.view.library.libraries;
      if (!libraries || libraries.length)
        await this.view.library.fetchLibrary();

      if (this._model instanceof LangModel) {
        if (this._model.name === LanguageType.ALL) {
          return this.view.library.libraries.map(
            (item: IOnlineLibrary) =>
              new OnlineNode(this.view, this, new OnlineModel(item))
          );
        }
        children = this.getCategories(this._model.name);
      }

      if (this._model instanceof CategoryModel) {
        children = this.getTemplates();
      }

      this._children = children;
    }
    return this._children;
  }

  private getCategories(lang: string): OnlineNode[] {
    let obj = {};
    for (const value of this.view.library.libraries) {
      if (value.language !== lang) break;
      if (!value.category) {
        obj[value.name] = true;
        break;
      }
      if (!obj[value.category]) {
        obj[value.category] = true;
      }
    }
    return Object.keys(obj).map(
      (name: string) =>
        new OnlineNode(this.view, this, new CategoryModel(name, lang))
    );
  }

  private getTemplates(): OnlineModel[] {
    return [];
  }
  /**
   * @description: 从库中获取指定key的nodes
   * @param {LanguageType} lang 指定language
   * @param {string} category 指定category
   * @return: 指定key 的nodes
   */
  private librariesToNodes(
    lang?: LanguageType,
    category?: string
  ): OnlineNode[] {
    console.log(lang, category);
    return [];
  }

  getTreeItem() {
    let result;
    if (
      this._model instanceof LangModel ||
      this._model instanceof CategoryModel
    ) {
      result = {
        label: this._model.name,
        collapsibleState: TreeItemCollapsibleState.Collapsed
      };
    }
    if (this._model instanceof OnlineModel) {
      const { id, name, description } = this._model;
      result = {
        label: this._model.isTemplate ? `${id} ${description}` : name,
        collapsibleState: description
          ? TreeItemCollapsibleState.None
          : TreeItemCollapsibleState.Collapsed,
        commands: this._model.isTemplate ? this.insert : undefined,
        iconPath: this.parseIconPathFromProblemState(this._model.state),
        contextValue: this._model.isTemplate ? "template" : ""
      };
    }
    return result;
  }

  private parseIconPathFromProblemState(state: string): string {
    switch (state) {
      case "1":
        return Container.content.asAbsolutePath(
          path.join("resources", "check.png")
        );
      case "2":
        return Container.content.asAbsolutePath(
          path.join("resources", "warning.png")
        );
      case "3":
        return Container.content.asAbsolutePath(
          path.join("resources", "blank.png")
        );
      default:
        return "";
    }
  }

  private insert() {}

  /**
   * @description: 收藏
   * @param {type}
   * @return:
   */
  favorite() {}
  /**
   * @description: 编辑
   * @param {type}
   * @return:
   */
  edit() {}

  /**
   * @description: 订阅
   * @param {type}
   * @return:
   */
  protected subscribe() {
    const disposables = [];

    return Disposable.from(...disposables);
  }
}
