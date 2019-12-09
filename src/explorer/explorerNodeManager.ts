import { Disposable } from "vscode";
import { listTreeNodes } from "../commands/list";
import { TemplateNode } from "./templateNode";
import { Language, defaultTreeNode } from "../shared";
class ExplorerNodeManager implements Disposable {
  private explorerNodeMap: Map<string, TemplateNode> = new Map<
    string,
    TemplateNode
  >();
  private categoryMap: Map<string, TemplateNode> = new Map<
    string,
    TemplateNode
  >();

  public dispose(): void {
    this.explorerNodeMap.clear();
    this.categoryMap.clear();
  }
  public async refreshCache(): Promise<void> {
    this.dispose();
    var res = await listTreeNodes();
    for (const treeItem of res) {
      this.explorerNodeMap.set(
        treeItem.language + treeItem.id,
        new TemplateNode(treeItem)
      );
      if (treeItem.category) {
        this.categoryMap.set(
          treeItem.category,
          new TemplateNode(
            Object.assign(
              {},
              defaultTreeNode,
              {
                id: treeItem.category,
                name: treeItem.category,
                language: treeItem.language,
                category: treeItem.category
              },
              false
            )
          )
        );
      }
    }
  }
  public getRootNodes(): TemplateNode[] {
    return [
      new TemplateNode(
        Object.assign(
          {},
          defaultTreeNode,
          {
            id: Language.All,
            name: Language.All
          },
          false
        )
      ),
      new TemplateNode(
        Object.assign(
          {},
          defaultTreeNode,
          {
            id: Language.CSS,
            name: Language.CSS
          },
          false
        )
      ),
      new TemplateNode(
        Object.assign(
          {},
          defaultTreeNode,
          {
            id: Language.JavaScript,
            name: Language.JavaScript
          },
          false
        )
      )
    ];
  }
  public getAllNodes(): TemplateNode[] {
    return Array.from(this.explorerNodeMap.values());
  }

  public getCategoryNodes(language: string): TemplateNode[] {
    const result: TemplateNode[] = [];
    for (const node of this.categoryMap.values()) {
      if (node.language === language) {
        result.push(node);
      }
    }
    return result.length ? result : this.getTemplateNodes(language);
  }

  public getTemplateNodes(language: string, category = ''): TemplateNode[] {
    const result: TemplateNode[] = [];
    for (const node of this.explorerNodeMap.values()) {
      if (node.language === language && node.category === category) {
        result.push(node);
      }
    }
    return result;
  }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
