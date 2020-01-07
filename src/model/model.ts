import { OnlineModel } from "./onlineModel";

export type IModel = OnlineModel;

export enum LanguageType {
    ALL="All",
    JS="javascript",
    CSS="css",
}

export abstract class Model {
  constructor(
    public readonly name: string,
    public readonly extname: string
  ) {}

  abstract isTemplate(): boolean;

}
