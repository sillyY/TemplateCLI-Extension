import { templateExecutor } from "../templateExecutor";

export class Template {
  /**
   * @description: install and save source 
   * @param {string} src online link
   * @param {string} path local path
   */  
  install(src: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        templateExecutor.executeRequest(src, path, () => resolve());
      } catch (err) {
        reject(err);
      }
    });
  }
}
