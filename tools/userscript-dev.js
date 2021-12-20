import log from './userscript-logger.js';
import renderOut from './userscript.js';
import watch from 'node-watch';
watch('./src/main.js', { recursive: true }, (evt, name) => {
let time = +new Date(),
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
jshead_dev = `// ==UserScript==
// @name         [Dev] Twitter External Translator
// @description  Adds external & internal translators
// @version      ${time}
${jshead_common}`;
  log(`Watch-path: ${name}`);
  // Development version
  renderOut("http-server/twittertranslator.dev.user.js", jshead_dev);
});