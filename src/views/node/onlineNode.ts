import * as path from "path";
import { Disposable, TreeItemCollapsibleState } from "vscode";
import { OnlineView } from "../onlineView";
import { SubscribeableViewNode, ViewNode } from "./viewNode";
import { Container } from "../../container";
import { OnlineModel } from "../../models/onlineModel";
import { LangModel } from "../../models/LangModel";
import { LanguageType } from "../../models/model";
import { IOnlineLibrary } from "../../library";
import { CategoryModel } from "../../models/categoryModel";
import { configuration } from "../../services/configuration";
import { requestAndSave } from "../../utils";

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
      if (!libraries || !libraries.length) {
        await this.view.library.fetchLibrary();
      }

      if (this._model instanceof LangModel) {
        if (this._model.name === LanguageType.ALL) {
          return this.view.library.libraries.map(
            (item: IOnlineLibrary) =>
              new OnlineNode(this.view, this, new OnlineModel(item))
          );
        }
        // NOTE: 如果是category，name 代表category，如果是template，代表name
        children = this.getCategories(this._model.name);
      }

      if (this._model instanceof CategoryModel) {
        children = this.getTemplates(this._model.name, this._model.lang);
      }

      this._children = children;
    }
    return this._children;
  }

  private getCategories(lang: string): OnlineNode[] {
    let categoryMap = new Map(),
      templateMap = new Map();
    for (const value of this.view.library.libraries) {
      if (value.language !== lang) continue;
      if (!value.category) {
        templateMap.set(
          value.name,
          new OnlineNode(this.view, this, new OnlineModel(value))
        );
        continue;
      }
      if (!categoryMap.has(value.category)) {
        categoryMap.set(
          value.category,
          new OnlineNode(
            this.view,
            this,
            new CategoryModel(value.category, lang)
          )
        );
      }
    }
    return [...categoryMap.values(), ...templateMap.values()];
  }

  private getTemplates(category: string, lang: string): OnlineModel[] {
    let templateMap = new Map();

    if (category === void 0 || lang === void 0) return [];
    for (const value of this.view.library.libraries) {
      if (value.category === category && value.language === lang) {
        templateMap.set(
          value.name,
          new OnlineNode(this.view, this, new OnlineModel(value))
        );
      }
    }
    return [...templateMap.values()];
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
      const { name, description, state, isTemplate } = this._model;
      result = {
        label: name,
        tooltip: isTemplate ? `${description}` : "",
        collapsibleState: description
          ? TreeItemCollapsibleState.None
          : TreeItemCollapsibleState.Collapsed,
        command: {
          title: "Insert Template",
          command: "template.views.insert",
          arguments: [() => this.triggerInsert()]
        },
        iconPath: this.parseIconPathFromProblemState(state),
        contextValue: isTemplate ? "template" : ""
      };
    }
    return result;
  }
  private parseIconPathFromProblemState(state: number): string {
    switch (state) {
      case 1:
        return Container.content.asAbsolutePath(
          path.join("resources", "check.png")
        );
      case 2:
        return Container.content.asAbsolutePath(
          path.join("resources", "warning.png")
        );
      case 3:
        return Container.content.asAbsolutePath(
          path.join("resources", "blank.png")
        );
      default:
        return "";
    }
  }

  private async triggerInsert() {
    /**
     * 1. 判断本地模板库是否存在，存在取本地，不存在取线上
     *    1.1 取本地数据
     *    1.2 取线上数据
     * 2. 调用insertTemplateToEditor插入数据
     */
    const { name, extname } = this._model;

    const localPath = this.getLocalFilePath(name, extname),
      onlinePath = this.getOnlieFilePath(
        this._prefix,
        this._model as OnlineModel
      );

    const data = this.isLocalFileExist(localPath)
      ? this.getLocalFile(localPath)
      : await this.onlineDataExecutor(onlinePath, localPath);

    data && this.insertTemplateToEditor(data);
  }
  private getLocalFilePath(name, extname) {
    return configuration.onlineLibraryFile(`${name}${extname}`);
  }
  /**
   * @description: 获取线上模板库模板文件路径
   * @param {OnlineModel} model online 模板数据
   * @return: 线上
   */
  private getOnlieFilePath(prefix: string, model: OnlineModel) {
    let { language, category, name, extname } = model;
    language = language ? `/${language}` : "";
    category = category ? `/${category}` : "";
    name = name ? `/${name}` : "";

    return `${prefix}/libs${language}${category}${name}${extname}`;
  }
  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  private async onlineDataExecutor(src: string, fullpath) {
    await requestAndSave(src, fullpath);
    this.triggerFileChanged()
    
    return this.getLocalFile(fullpath);
  }
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
