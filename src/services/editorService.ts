import { TextEditor, window, TextEditorEdit, Position, Disposable } from "vscode";

export class EditorService implements Disposable {
  private readonly _disposable: Disposable;

  private _editor: TextEditor | undefined;
  get editor() {
    return this._editor;
  }
  
  constructor() {
    this._editor = window.activeTextEditor;
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }
  async insert(data: string) {
    try {
      if (!this._editor) {
        console.error("Failed to found Editor. Please open the Editor.");
        return;
      }

      this._editor.edit((builder: TextEditorEdit) => {
        builder.insert(
          new Position(
            this._editor!.selection.end.line,
            this._editor!.selection.end.character
          ),
          data
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
