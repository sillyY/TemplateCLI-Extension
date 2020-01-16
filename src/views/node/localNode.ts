import { ViewNode, SubscribeableViewNode } from "./viewNode";
import { LocalView } from "../localView";
import { ILocalLibrary } from "../../library";
import { LocalModel } from "../../models/localModel";
import { configuration } from "../../services/configuration";
import { Container } from "../../container";
import { Disposable } from "vscode";
import { file } from "../../utils";

export class LocalNode extends SubscribeableViewNode<LocalView> {
  private _children: ViewNode[] | undefined;

  private _model: LocalModel | undefined;
  get model() {
    return this._model;
  }
  constructor(view: LocalView, model?: LocalModel) {
    super(view);
    this._model = model;
  }
  resetChildren() {
    if (this._children === void 0) return;
    for (const child of this._children) {
      if (child instanceof LocalNode) {
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
          (item: ILocalLibrary) =>
            new LocalNode(this.view, new LocalModel(item))
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
     * 1. 判断本地模板库是否存在，存在取本地，不存在抛出异常
     *
     * 2. 调用insertTemplateToEditor插入 数据
     */

    if (!this._model) return;

    const { name, extname } = this._model;

    const localPath = this.getLocalFilePath(name, extname);

    const data = this.getLocalFile(localPath);

    if (data) {
      this.insertTemplateToEditor(data);
    } else {
      // TODO: 抛出异常
    }
  }

  async refresh(reset: boolean = true) {
    if (this._children === void 0) return;

    if (reset) {
      this.triggerFileChanged(false)
      this.resetChildren();
      await this.unsubscribe();
      void this.ensureSubscription();
      return;
    }
  }

  async load(reset: boolean) {
    if (reset) {
      /**
       * 1. 弹出选择弹框，并获取选中文件
       * 2. 将文件插入本地模板存储文件夹中
       * 3. 触发triggerFileChanged促使配置文件更改，
       */
      const res = await Container.editor.load();
      if (!res || !res.length) return;

      for (const item of res) {
        const src = item.path,
          fullname = file.fullname(src);
        file.copyFile(src, configuration.localLibraryFile(fullname));
      }

      this.triggerFileChanged();
    }
  }

  private getLocalFilePath(name, extname) {
    return configuration.localLibraryFile(`${name}${extname}`);
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
