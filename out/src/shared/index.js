"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateState;
(function (TemplateState) {
    TemplateState[TemplateState["Install"] = 1] = "Install";
    TemplateState[TemplateState["NotInstall"] = 2] = "NotInstall";
    TemplateState[TemplateState["Unknown"] = 3] = "Unknown";
})(TemplateState = exports.TemplateState || (exports.TemplateState = {}));
var Language;
(function (Language) {
    Language["All"] = "All";
    Language["CSS"] = "CSS";
    Language["JavaScript"] = "JavaScript";
})(Language = exports.Language || (exports.Language = {}));
// ONLINE
exports.ONLINE_BASE_URL = "https://cdn.jsdelivr.net/gh/sillyY/template-library";
exports.defaultTreeNode = {
    id: "",
    name: "",
    category: "",
    description: "",
    state: TemplateState.Install,
    language: "",
    extname: ""
};
exports.defaultLocalTreeNode = {
    name: "",
    extname: ""
};
exports.defaultMineTreeNode = {
    name: "",
    extname: "",
    path: ""
};
//# sourceMappingURL=index.js.map