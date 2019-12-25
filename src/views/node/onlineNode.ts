import { SubscribeableViewNode, ViewNode } from "./viewNode";
import { View } from "./viewBase";
import { TreeItem } from "vscode";

export class OnlineNode extends SubscribeableViewNode {
  constructor(view: View) {
    super(view);
  }

  async getChildren(): Promise<ViewNode[]> {
    const children: ViewNode[] = [];

    return children;
  }

  getTreeItem(): TreeItem {
    return {};
  }
}
