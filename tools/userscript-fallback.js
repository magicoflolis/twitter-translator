import { transformFileSync } from "@babel/core";
import { readFileSync, writeFile } from "fs";
import watch from 'node-watch';
watch('./src/main.js', { recursive: true }, (evt, name) => {
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
},
renderOut = (outFile, jshead) => {
  let ujs = nano(header, {
    jshead: jshead,
    foreign: foreign,
    tetCSS: tetCSS,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? console.log(err) : console.log(`Build: ${outFile}`);
  });
},
time = +new Date(),
jshead_common = `// @author       Magic <magicoflolis@tuta.io>
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @downloadURL  https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @updateURL    https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @namespace    https://github.com/magicoflolis/twitter-translator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/twitter-translator#twitter-external-translator
// @supportURL   https://github.com/magicoflolis/twitter-translator/issues/new
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js?_=${time}
// @match        https://mobile.twitter.com/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://www.twitlonger.com/show/*
// @match        https://nitter.net/*
// @match        https://nitter.*/*
// @match        https://nitter.*.*/*
// @match        https://nitter.domain.glass/*
// @match        https://nitter-home.kavin.rocks/*
// @match        https://birdsite.xanny.family/*
// @match        https://twitr.gq/*
// @exclude      https://twitter.com/login
// @exclude      https://twitter.com/signup
// @exclude      https://twitter.com/i/flow/signup
// @exclude      https://twitter.com/teams/*
// @exclude      https://twitter.com/*/authorize?*
// @exclude      https://twitter.com/*/begin_password_reset
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @license      GPL-3.0
// ==/UserScript==`,
jshead_prod = `// ==UserScript==
// @name         Twitter External Translator
// @name:bg      Външен преводач на Twitter
// @name:zh      Twitter外部翻译器
// @name:zh-CN   Twitter外部翻译器
// @name:zh-TW   Twitter外部翻译器
// @name:cs      Externí překladatel Twitter
// @name:da      Twitter ekstern oversætter
// @name:et      Twitteri väline tõlkija
// @name:fi      Twitter Ulkoinen kääntäjä
// @name:el      Εξωτερικός μεταφραστής Twitter
// @name:hu      Twitter külső fordító
// @name:lv      Twitter Ārējais tulkotājs
// @name:lt      "Twitter" išorinis vertėjas
// @name:ro      Twitter Traducător extern
// @name:sk      Externý prekladateľ Twitter
// @name:sl      Twitter Zunanji prevajalec
// @name:sv      Twitter Extern översättare
// @name:nl      Twitter Externe Vertaler
// @name:fr      Traducteur externe Twitter
// @name:de      Externer Twitter-Übersetzer
// @name:it      Traduttore esterno di Twitter
// @name:ja      ツイッター外部翻訳者
// @name:pl      Zewnętrzny tłumacz Twittera
// @name:pt      Tradutor externo do Twitter
// @name:pt-BR   Tradutor externo do Twitter
// @name:ru-RU   Twitter Внешний переводчик
// @name:ru      Twitter Внешний переводчик
// @name:es      Traductor externo de Twitter
// @description  Adds external & internal translators
// @description:zh      将第三方翻译添加到推特
// @description:zh-CN   将第三方翻译添加到推特
// @description:zh-TW   將第三方翻譯添加到推特
// @description:bg      Добавя преводачи на трети страни в Twitter
// @description:cs      Přidává překladatele třetích stran na Twitter
// @description:da      Tilføjer tredjepartsoversættere til Twitter
// @description:et      Lisab kolmanda osapoole tõlkijad Twitterisse
// @description:fi      Lisää kolmannen osapuolen kääntäjiä Twitteriin
// @description:el      Προσθέτει μεταφραστές 3ου μέρους στο Twitter
// @description:hu      Hozzáadja a 3. féltől származó fordítókat a Twitterhez
// @description:lv      Pievieno trešās puses tulkotājus Twitter
// @description:lt      Prideda trečiųjų šalių vertėjus į "Twitter
// @description:ro      Adaugă traducători de la terțe părți la Twitter
// @description:sk      Pridáva prekladateľov tretích strán na Twitter
// @description:sl      Dodaja prevajalce tretjih oseb na Twitterju
// @description:sv      Lägger till översättare från tredje part till Twitter
// @description:nl      Voegt vertalers van derden toe aan Twitter
// @description:fr      Ajout de traducteurs tiers à Twitter
// @description:de      Fügt Drittanbieter-Übersetzer zu Twitter hinzu
// @description:it      Aggiunge traduttori di terze parti a Twitter
// @description:pl      Dodaje tłumaczy innych firm do Twittera
// @description:pt      Adiciona tradutores de terceiros ao Twitter
// @description:pt-BR   Adiciona tradutores de terceiros ao Twitter
// @description:ja      サードパーティの翻訳者をツイッターに追加
// @description:ru-RU   Добавляет сторонних переводчиков в Twitter
// @description:ru      Добавляет сторонних переводчиков в Twitter
// @description:es      Añade traductores de terceros a Twitter
// @version      0.31
${jshead_common}`,
jshead_dev = `// ==UserScript==
// @name         [Dev] Twitter External Translator
// @description  Adds external & internal translators
// @version      ${time}
${jshead_common}`;
  console.log('%s changed.', name);
  // Development version
	renderOut("./http-server/twittertranslator.dev.user.js", jshead_dev);
  //renderOut("./dist/twittertranslator.dev.user.js", jshead_dev);
  // Release version
  renderOut("./dist/twittertranslator.user.js", jshead_prod);
});

// watcher.on('change', (evt, name) => {
//   // callback
//   console.log('%s changed.', name);
//   renderOut("./dist/twittertranslator.dev.user.js", jshead_dev);
// });

// watcher.on('error', (err) => {
//   // handle error
//   console.log('%s', err);
//   renderOut("./dist/twittertranslator.dev.user.js", jshead_dev);
// });

// watcher.on('ready', () => {
//   // the watcher is ready to respond to changes
//   renderOut("./dist/twittertranslator.dev.user.js", jshead_dev);
// });