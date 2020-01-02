import { ViewNode } from "../views/node";
import { ViewBase, View } from "../views/viewBase";

export class Template  extends ViewNode<View>{
    private _children: ViewNode[] | undefined;
    
    constructor(view: View) {
        super(view)
    }
    getChildren() {
        return []
    }


    getTreeItem() {
        return {}
    }
}