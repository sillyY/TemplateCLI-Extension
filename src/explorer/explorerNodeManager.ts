import { Disposable } from "vscode";
import { TemplateNode } from "./templateNode";
import { Category, defaultTreeNode } from "../shared";
class ExplorerNodeManager implements Disposable {
  public dispose(): void {}
  public async refreshCache(): Promise<void> {
    this.dispose()
  }
  public getRootNodes(): TemplateNode[] {
    return [
      new TemplateNode(
        Object.assign({}, defaultTreeNode, {
          id: Category.All,
          name: Category.All
        })
      )
      // new LeetCodeNode(Object.assign({}, defaultTreeNode, {
      //     id: Category.Difficulty,
      //     name: Category.Difficulty,
      // }), false),
      // new LeetCodeNode(Object.assign({}, defaultProblem, {
      //     id: Category.Tag,
      //     name: Category.Tag,
      // }), false),
      // new LeetCodeNode(Object.assign({}, defaultProblem, {
      //     id: Category.Company,
      //     name: Category.Company,
      // }), false),
      // new LeetCodeNode(Object.assign({}, defaultProblem, {
      //     id: Category.Favorite,
      //     name: Category.Favorite,
      // }), false),
    ];
  }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
