import * as request from "request";
import * as fs from "fs";
import { file } from "./file";

export async function requestAndSave(url: string, dst: string) {
  try {
    const srcstream = request(url);
    const dststream = fs.createWriteStream(dst);
    let error;
    srcstream.on("response", function(res) {
      if (res.statusCode !== 200) {
        srcstream.emit("error", "HTTP Error: " + res.statusCode);
      }
    });
    srcstream.pipe(dststream);
    srcstream.on("error", function(e) {
      dststream.emit("error", e);
    });
    dststream.on("error", function(e) {
      error = e;
      dststream.end();
    });
    dststream.on("close", function() {
      if (error) file.rm(dst);
      return;
    });
  } catch (err) {
    console.log(err);
  }
}