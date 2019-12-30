"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    try {
        container_1.Container.initialize(context);
    }
    catch (err) {
        console.log(err);
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map