/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-env node */
// import { transformFileSync } from "@swc/core";
import { readFileSync, writeFile } from "fs";
import watch from 'node-watch';

const log = (...message) => {
  console.log('[%cNodeJS%c] %cDBG', 'color: rgb(0, 186, 124);', '', 'color: rgb(255, 212, 0);', `${[...message]} ${performance.now()}ms`)
},
delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
},
nano = (template, data) => {
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split("."),
    v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
},
p = {
  dev: "./http-server/twittertranslator.dev.user.js",
  pub: "./dist/twittertranslator.user.js",
},
js_env = process.env.JS_ENV === 'development',
jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
watcher = watch('./src/main.js', { recursive: true }, (evt, name) => {
let header = readFileSync("./src/header.js").toString(),
foreign = readFileSync("./dist/css/foreign.css").toString(),
nitterCSS = readFileSync("./dist/css/useSiteColors.css").toString(),
tetCSS = readFileSync("./dist/css/twittertranslator.css").toString(),
code = readFileSync("./src/main.js").toString(),
// code = transformFileSync("./src/main.js").code,
renderOut = (outFile, jshead) => {
  let ujs = nano(header, {
    jshead: jshead,
    foreign: foreign,
    tetCSS: tetCSS,
    nitterCSS: nitterCSS,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? log(err) : log(`Build-path: ${outFile}`);
  });
},
time = +new Date(),
jshead_common = `// @author       ${jsonData.author}
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @downloadURL  https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @updateURL    https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @supportURL   https://github.com/magicoflolis/twitter-translator/issues/new
// @namespace    ${jsonData.homepage}
// @homepageURL  ${jsonData.homepage}
// @license      GPL-3.0
// @match        https://mobile.twitter.com/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://www.twitlonger.com/show/*
// @match        https://nitter.net/*
// @match        https://nitter.*/*
// @match        https://nitter.*.*/*
// @match        https://nitter-home.kavin.rocks/*
// @match        https://birdsite.xanny.family/*
// @match        https://nttr.stream/*
// @match        https://lu-nitter.resolv.ee/*
// @match        https://twitter.076.ne.jp/*
// @match        https://notabird.site/*
// @match        https://n.hyperborea.cloud/*
// @match        https://twitter.censors.us/*
// @match        https://bird.trom.tf/*
// @match        https://twitr.gq/*
// @exclude      https://twitter.com/login
// @exclude      https://twitter.com/signup
// @exclude      https://twitter.com/i/flow/login
// @exclude      https://twitter.com/i/flow/signup
// @exclude      https://twitter.com/teams/*
// @exclude      https://twitter.com/*/authorize?*
// @exclude      https://twitter.com/*/begin_password_reset
// @exclude      https://twitter.com/account/*
// @exclude      https://mobile.twitter.com/i/flow/login
// @exclude      https://mobile.twitter.com/i/flow/signup
// @exclude      https://nitter.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_info
// @compatible   Chrome
// @compatible   Firefox
// ==/UserScript==`,
jshead_prod = `// ==UserScript==
// @name         ${jsonData.productName}
// @name:bg      ???????????? ???????????????? ???? Twitter
// @name:zh      Twitter???????????????
// @name:zh-CN   Twitter???????????????
// @name:zh-TW   Twitter???????????????
// @name:cs      Extern?? p??ekladatel Twitter
// @name:da      Twitter ekstern overs??tter
// @name:et      Twitteri v??line t??lkija
// @name:fi      Twitter Ulkoinen k????nt??j??
// @name:el      ???????????????????? ?????????????????????? Twitter
// @name:hu      Twitter k??ls?? ford??t??
// @name:lv      Twitter ??r??jais tulkot??js
// @name:lt      "Twitter" i??orinis vert??jas
// @name:ro      Twitter Traduc??tor extern
// @name:sk      Extern?? prekladate?? Twitter
// @name:sl      Twitter Zunanji prevajalec
// @name:sv      Twitter Extern ??vers??ttare
// @name:nl      Twitter Externe Vertaler
// @name:fr      Traducteur externe Twitter
// @name:de      Externer Twitter-??bersetzer
// @name:it      Traduttore esterno di Twitter
// @name:ja      ??????????????????????????????
// @name:pl      Zewn??trzny t??umacz Twittera
// @name:pt      Tradutor externo do Twitter
// @name:pt-BR   Tradutor externo do Twitter
// @name:ru-RU   Twitter ?????????????? ????????????????????
// @name:ru      Twitter ?????????????? ????????????????????
// @name:es      Traductor externo de Twitter
// @description  ${jsonData.description}
// @description:zh      ?????????????????????????????????
// @description:zh-CN   ?????????????????????????????????
// @description:zh-TW   ?????????????????????????????????
// @description:bg      ???????????? ?????????????????? ???? ?????????? ???????????? ?? Twitter
// @description:cs      P??id??v?? p??ekladatele t??et??ch stran na Twitter
// @description:da      Tilf??jer tredjepartsovers??ttere til Twitter
// @description:et      Lisab kolmanda osapoole t??lkijad Twitterisse
// @description:fi      Lis???? kolmannen osapuolen k????nt??ji?? Twitteriin
// @description:el      ?????????????????? ?????????????????????? 3???? ???????????? ?????? Twitter
// @description:hu      Hozz??adja a 3. f??lt??l sz??rmaz?? ford??t??kat a Twitterhez
// @description:lv      Pievieno tre????s puses tulkot??jus Twitter
// @description:lt      Prideda tre??i??j?? ??ali?? vert??jus ?? "Twitter
// @description:ro      Adaug?? traduc??tori de la ter??e p??r??i la Twitter
// @description:sk      Prid??va prekladate??ov tret??ch str??n na Twitter
// @description:sl      Dodaja prevajalce tretjih oseb na Twitterju
// @description:sv      L??gger till ??vers??ttare fr??n tredje part till Twitter
// @description:nl      Voegt vertalers van derden toe aan Twitter
// @description:fr      Ajout de traducteurs tiers ?? Twitter
// @description:de      F??gt Drittanbieter-??bersetzer zu Twitter hinzu
// @description:it      Aggiunge traduttori di terze parti a Twitter
// @description:pl      Dodaje t??umaczy innych firm do Twittera
// @description:pt      Adiciona tradutores de terceiros ao Twitter
// @description:pt-BR   Adiciona tradutores de terceiros ao Twitter
// @description:ja      ????????????????????????????????????????????????????????????
// @description:ru-RU   ?????????????????? ?????????????????? ???????????????????????? ?? Twitter
// @description:ru      ?????????????????? ?????????????????? ???????????????????????? ?? Twitter
// @description:es      A??ade traductores de terceros a Twitter
// @version      ${jsonData.version}
${jshead_common}`,
jshead_dev = `// ==UserScript==
// @name         [Dev] ${jsonData.productName}
// @description  ${jsonData.description}
// @version      ${time}
${jshead_common}`;
if(js_env){
  // Development version
  renderOut(p.dev, jshead_dev);
} else {
  // Release version
  renderOut(p.pub, jshead_prod);
}
});

log(`ENV: ${process.env.JS_ENV}`);

watcher.on('error', (err) => {
  log(err);
  watcher.close();
  delay(5000).then(() => watcher);
});

// @grant        GM.deleteValue
// @grant        GM_deleteValue
// @grant        GM.getValue
// @grant        GM_getValue
// @grant        GM.info
// @grant        GM_info
// @grant        GM.setValue
// @grant        GM_setValue
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
