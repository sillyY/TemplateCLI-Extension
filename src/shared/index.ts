export enum TemplateState {
  Install = 1,
  NotInstall = 2,
  Unknown = 3
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
