import dotenv from 'dotenv';
import { access, constants, readFile, writeFile } from 'fs/promises';
import watch from 'node-watch';

// const result = dotenv.config({ path: './src/UserJS/.env' });

/** Source Directories */
const sDir = {
  head: './src/UserJS/header.js',
  body: './src/UserJS/main.js'
};
/** Dest Directories */
const dDir = {
  dev: './build/UserJS',
  public: './dist/UserJS'
};
/** UserJS \@grant
 *
 * \/\/@grant [permission]
 */
const ujsGrant = [
  'navigator.userAgent',
  'document.cookie',
  'GM_getValue',
  'GM_setValue',
  'GM_info',
  'GM_openInTab',
  'GM_xmlhttpRequest'
];
/** UserJS \@resource
 *
 * \/\/@resource [name] [URL]
 */
const ujsRes = {};
/** Watch Directories */
const watcher = watch(['./src/Common/sass/', './src/UserJS/'], {
  recursive: true,
  delay: 2000,
  filter: /\.(js|[s]css)$/
});
/**
 * setTimeout w/ Promise
 * @param {number} ms - Timeout in milliseconds (ms)
 * @returns {Promise} Promise object
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Object is Null
 * @param {Object} obj - Object
 * @returns {boolean} Returns if statement true or false
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @param {(Object|Object[]|string)} obj - Array, Set, Object or String
 * @returns {boolean} Returns if statement true or false
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    (obj instanceof Set && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (obj instanceof Object &&
      typeof obj.entries !== 'function' &&
      Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * Object is Empty
 * @param {(Object|Object[]|string)} obj - Array, object or string
 * @returns {boolean} Returns if statement true or false
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
const canAccess = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    access(filePath, constants.R_OK | constants.W_OK).then((testAccess) => {
      if (isNull(testAccess)) {
        resolve(readFile(filePath, encoding).then((data) => data.toString()));
      }
      reject({
        msg: `Cannot access provided filePath: ${filePath}`
      });
    });
  });
};
const fileToJSON = async (filePath, encoding) => {
  const testAccess = await canAccess(filePath, encoding);
  if (typeof testAccess === 'object') {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};

let result = {};

async function initUserJS(env) {
  try {
    const jsonData = await fileToJSON('./package.json', 'utf-8');
    /** Build Paths */
    const p = {
      dev: `${dDir.dev}/${jsonData.userJS.name
        .toLocaleLowerCase()
        .replaceAll(/\s/g, '')}.dev.user.js`,
      pub: `${dDir.public}/${jsonData.userJS.name
        .toLocaleLowerCase()
        .replaceAll(/\s/g, '')}.user.js`
    };
    const nano = (template, data) => {
      // eslint-disable-next-line no-useless-escape
      return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
        const keys = key.split('.');
        let v = data[keys.shift()];
        for (const i in keys.length) v = v[keys[i]];
        return isEmpty(v) ? '' : v;
      });
    };
    const js_env = env.JS_ENV === 'development';
    const outFile = js_env ? p.dev : p.pub;
    const formatResources = () => {
      const response = [];
      for (const [key, value] of Object.entries(ujsRes)) {
        response.push(`// @resource     ${key} ${value}`);
      }
      return response.join('\n');
    };
    const buildUserJS = async () => {
      try {
        const userJSHeader = `// ==UserScript==\n// @name         ${
          js_env ? `[Dev] ${jsonData.userJS.name}` : jsonData.userJS.name
        }
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
// @name:lt      'Twitter' išorinis vertėjas
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
// @description  ${jsonData.description}
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
// @description:lt      Prideda trečiųjų šalių vertėjus į 'Twitter
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
// @author       ${jsonData.author}
// @version      ${js_env ? Number(new Date()) : jsonData.userJS.version}
// @icon         ${jsonData.userJS.icon}
// @downloadURL  ${js_env ? `https://localhost:8080/${p.dev}` : jsonData.userJS.url}
// @updateURL    ${js_env ? `https://localhost:8080/${p.dev}` : jsonData.userJS.url}
// @namespace    ${jsonData.userJS.homepage}
// @homepageURL  ${jsonData.userJS.homepage}
// @supportURL   ${jsonData.userJS.bugs}
// @license      ${jsonData.license}
// @connect      *
// @match        https://mobile.x.com/*
// @match        https://x.com/*
// @match        https://mobile.twitter.com/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://www.twitlonger.com/show/*
// @match        https://nitter.*/*
// @match        https://nitter.*.*/*
// @match        https://nitter.lacontrevoie.fr/*
// @match        https://nitter.fdn.fr/
// @match        https://nitter.kavin.rocks/*
// @match        https://nitter.moomoo.me/*
// @match        https://nitter.weiler.rocks/*
// @match        https://nitter.nl/*
// @match        https://nitter.esmailelbob.xyz/*
// @match        https://nitter.tiekoetter.com/*
// @match        https://nitter.poast.org/*
// @match        https://nitter.privacydev.net/*
// @match        https://nitter.projectsegfau.lt/*
// @match        https://nitter.in.projectsegfau.lt/*
// @match        https://canada.unofficialbird.com/*
// @match        https://nederland.unofficialbird.com/*
// @match        https://n.sneed.network/*
// @match        https://nitter.caioalonso.com/*
// @match        https://nitter.nicfab.eu/*
// @match        https://nitter.hostux.net/*
// @match        https://nitter.kling.gg/*
// @match        https://nitter.onthescent.xyz/*
// @match        https://nitter.oksocial.net/*
// @match        https://nitter.datura.network/*
// @match        https://nitter.catsarch.com/*
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
// @exclude      https://nitter.com${
          isBlank(ujsGrant)
            ? ''
            : `\n${ujsGrant.map((param) => `// @grant        ${param}`).join('\n')}`
        }${isBlank(ujsRes) ? '' : `\n${formatResources()}`}
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @compatible   safari
// @noframes
// @run-at       document-start
// ==/UserScript==`;
        const headerFile = await canAccess(sDir.head);
        const mainFile = await canAccess(sDir.body);
        const foreign = await canAccess('./dist/css/foreign.css');
        const nitterCSS = await canAccess('./dist/css/useSiteColors.css');
        const tetCSS = await canAccess('./dist/css/twittertranslator.css');
        const lngList = await canAccess('./src/languages.js');
        const wfConfig = nano(headerFile, {
          jshead: userJSHeader,
          foreign: foreign,
          tetCSS: tetCSS,
          nitterCSS: nitterCSS,
          languages: lngList,
          debugToggle: js_env.toString(),
          code: mainFile
        });
        await writeFile(outFile, wfConfig);
        const dateOptions = {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          fractionalSecondDigits: 3
        };
        log('Build:', {
          path: outFile,
          time: new Intl.DateTimeFormat('default', dateOptions).format(new Date(Date.now()))
        });
      } catch (ex) {
        err(ex);
      }
    };

    //#region Start Process
    log(`Node ENV: ${env.JS_ENV}`);

    if (js_env) {
      watcher.on('change', buildUserJS);
      watcher.on('error', (ex) => {
        err(ex);
        watcher.close();
        delay(5000).then(buildUserJS);
      });
      watcher.on('ready', buildUserJS);
      return;
    }
    await buildUserJS();
    process.exit(0);
    //#endregion
  } catch (ex) {
    err(ex);
  }
}

try {
  if (isEmpty(process.env.JS_ENV)) {
    result = dotenv.config({ path: './src/UserJS/.env' });
  } else {
    result = dotenv.config({ path: './dist/UserJS/.env' });
  };
  if (result.error) {
    throw result.error;
  }
  if (isNull(result.parsed.JS_ENV)) {
    dotenv.populate(
      result.parsed,
      {
        JS_ENV: 'development'
      },
      { override: true, debug: true }
    );
  }
  initUserJS(result.parsed);
} catch (ex) {
  err(ex);
}

function log(...msg) {
  console.log('[UserJS]', ...msg);
}

function err(...msg) {
  console.error('[UserJS] ERROR', ...msg);
}
