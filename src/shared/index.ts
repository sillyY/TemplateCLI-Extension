export enum TemplateState {
  Install = 1,
  // TODO: NotInstall 后续改为2
  NotInstall = 3,
  Unknown = 2
}
export enum Language {
  All = "All",
  CSS = "CSS",
  JavaScript = "JavaScript"
}

export interface ITreeNode {
  id: string;
  fid: string;
  name: string;
  category: string;
  slug: string;
  state: TemplateState;
  language: string;
  lan: string;
}

export const defaultTreeNode: ITreeNode = {
  id: "",
  fid: "",
  name: "",
  category: "",
  slug: "",
  state: TemplateState.Install,
  language: "",
  lan: ""
};
