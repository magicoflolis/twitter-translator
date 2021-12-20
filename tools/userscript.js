import log from './userscript-logger.js';
import { transformFileSync } from "@babel/core";
import { readFileSync, writeFile } from 'fs';
let header = readFileSync("./src/header.js").toString(),
foreign = readFileSync("./dist/css/foreign.css").toString(),
tetCSS = readFileSync("./dist/css/twittertranslator.css").toString(),
code = transformFileSync("./src/main.js").code,
nano = (template, data) => {
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split("."),
      v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
};
/**
 * @param {string} outFile - Output path with filename
 * @param {string} jshead - Userscript header
 */
function renderOut(outFile, jshead) {
  let ujs = nano(header, {
    jshead: jshead,
    foreign: foreign,
    tetCSS: tetCSS,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? log(err,"err") : log(`Build-path: ${outFile}`);
  });
};

export default renderOut;