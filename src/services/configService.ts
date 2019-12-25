import { EventEmitter } from "events";
import { ConfigStatus } from "../shared";
import { file } from "../utils";

class ConfigManager extends EventEmitter {
  private _status: ConfigStatus;
  private _path: string;

  constructor(path: string) {
    super();
    this._status = ConfigStatus.NoExist;
    this._path = path;
  }
  get status(): ConfigStatus {
    return this._status;
  }
  get path(): string {
    return this._path;
  }
  get dir(): string {
    return file.dirname(this._path);
  }
  get currentData(): any[] {
    let data = file.data(this._path);
    return data ? JSON.parse(data) : [];
  }
  public dispose() {}

  public modifyConfig(data: any[]): void {
    file.mkdir(this.dir);
    file.write(this.path, JSON.stringify(data));
  }
}

export default ConfigManager;
