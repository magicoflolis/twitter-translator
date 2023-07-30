let userjs = (self.userjs = {});

// Skip text/plain documents.
if (
  (document instanceof HTMLDocument ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}

let dLng = 'en';
let cfg = {};
let lng = {};
let cBG = 'rgba(91, 112, 131, 0.4)';
let cColor = 'r-p1n3y5 r-1bih22f';
let cHover = 'r-1q3imqu';
let cText = 'r-jwli3a';
let cTheme = 'r-kemksi';
let cSub = 'r-13gxpu9';

const normalizeTarget = (target) => {
  if (typeof target === 'string') {
    return Array.from(document.querySelectorAll(target));
  }
  if (target instanceof Element) {
    return [target];
  }
  if (target === null) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  return Array.from(target);
};

const SafeAnimationFrame = class {
  constructor(callback) {
    this.fid = this.tid = undefined;
    this.callback = callback;
  }
  start(delay) {
    if (delay === undefined) {
      if (this.fid === undefined) {
        this.fid = requestAnimationFrame(() => {
          this.onRAF();
        });
      }
      if (this.tid === undefined) {
        this.tid = setTimeout(() => {
          this.onSTO();
        }, 20000);
      }
      return;
    }
    if (this.fid === undefined && this.tid === undefined) {
      this.tid = setTimeout(() => {
        this.macroToMicro();
      }, delay);
    }
  }
  clear() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
  }
  macroToMicro() {
    this.tid = undefined;
    this.start();
  }
  onRAF() {
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
    this.fid = undefined;
    this.callback();
  }
  onSTO() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    this.tid = undefined;
    this.callback();
  }
};

class dom {
  static attr(target, attr, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr);
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  }

  static create(a) {
    if (typeof a === 'string') {
      return document.createElement(a);
    }
  }

  static text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  }
}

dom.cl = class {
  static add(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(name);
      }
    }
  }

  static remove(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(name);
      }
    }
  }

  static toggle(target, name, state) {
    let r;
    for (const elem of normalizeTarget(target)) {
      r = elem.classList.toggle(name, state);
    }
    return r;
  }

  static has(target, name) {
    for (const elem of normalizeTarget(target)) {
      if (elem.classList.contains(name)) {
        return true;
      }
    }
    return false;
  }
};

dom.root = document.querySelector(':root');
dom.html = document.documentElement;
dom.head = document.head;
dom.body = document.body;
dom.search = document || dom.root || dom.html || dom.head || dom.body;

// const NOOPFUNC = () => {};
const nitterURL = 'https://raw.githubusercontent.com/wiki/zedeus/nitter/Instances.md';
const hasOwn = Object.hasOwn || Object.prototype.hasOwnProperty.call;
const cfgDefault = {
  debug: debugToggle,
  lang: dLng,
  translator: 'deepl',
  display: 'text + icon',
  colors: 'auto',
  theme: 'auto',
  delay: 'none',
  sitetheme: true,
  dms: true,
  tweets: true,
  bios: true,
  api: {
    deepl: '',
    google: '',
    libre: '',
    translate: '',
    yandex: '',
    version: 'api-free'
  },
  url: {
    bing: 'https://www.bing.com',
    bingIT: '',
    deepl: 'https://www.deepl.com',
    deeplIT: 'https://api.deepl.com',
    google: 'https://translate.google.com',
    googleIT: 'https://translation.googleapis.com',
    libre: 'https://translate.argosopentech.com/translate',
    lingva: 'https://lingva.ml',
    mymemory: 'https://mymemory.translated.net',
    mymemoryIT: 'https://api.mymemory.translated.net',
    translate: 'https://www.translate.com',
    translateIT: 'https://api.translate.com/translate/v1/mt',
    yandex: 'https://translate.yandex.com',
    yandexIT: 'https://translate.api.cloud.yandex.net/translate/v2/translate'
  },
  nitterInstances: []
};
const topDOM = window.self === window.top;
const win = self ?? window;
const doc = document;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const domURL = new URL(location);
const UA = navigator.userAgent;
const isMobile = /Mobile|Tablet/.test(UA); // /Mobi/.test(UA);
const isGM = typeof GM !== 'undefined';
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
  const objExec = /\[object (.+)\]/.exec(Object.prototype.toString.call(obj));
  if (objExec.length === 0) {
    return false;
  }
  const objStr = objExec[1];
  return (
    (/string/i.test(objStr) && Object.is(obj.trim(), '')) ||
    (/map|set/i.test(objStr) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (/object/i.test(objStr) &&
      typeof obj.entries !== 'function' &&
      Object.is(Object.keys(obj).length, 0))
  );

  // return (
  //   (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
  //   ((obj instanceof Map || obj instanceof Set) && Object.is(obj.size, 0)) ||
  //   (Array.isArray(obj) && Object.is(obj.length, 0)) ||
  //   (obj instanceof Object &&
  //     typeof obj.entries !== 'function' &&
  //     Object.is(Object.keys(obj).length, 0))
  // );
};
/**
 * Object is Empty
 * @param {(Object|Object[]|string)} obj - Array, object or string
 * @returns {boolean} Returns if statement true or false
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
const qsA = (element, root) => {
  try {
    root = root || dom.search;
    return root.querySelectorAll(element);
  } catch (ex) {
    return console.error(ex);
  }
};
/**
 * Prefix for document.querySelector()
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
const qs = (element, root) => {
  try {
    root = root || dom.search;
    return root.querySelector(element);
  } catch (ex) {
    return console.error(ex);
  }
};
/**
 * Prefix for document.querySelector() w/ Promise
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
const query = (element, root) => {
  root = root || dom.search;
  if (!isNull(root.querySelector(element))) {
    return Promise.resolve(root.querySelector(element));
  }
  const loop = async () => {
    while (isNull(root.querySelector(element))) {
      // await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => {
        const queryTimer = new SafeAnimationFrame(resolve);
        queryTimer.start(1);
      });
    }
    return root.querySelector(element);
  };
  return Promise.any([loop(), delay(5000).then(() => Promise.reject('Unable to locate element'))]);
};
/**
 * Add Event Listener
 * @param {Object} root - Selected Element
 * @param {string} type - root Event Listener
 * @param {Function} callback - Callback function
 * @param {Object} [options={}] - (Optional) Options
 * @returns {Object} Returns selected Element
 */
const ael = (root, type, callback, options = {}) => {
  try {
    root = root || dom.search;
    if (isMobile && type === 'click') {
      type = 'mouseup';
      root.addEventListener('touchstart', callback);
      root.addEventListener('touchend', callback);
    }
    if (type === 'fclick') {
      type = 'click';
    }
    return root.addEventListener(type, callback, options);
  } catch (ex) {
    return err(ex);
  }
};
/**
 * Form Attributes of Element
 * @param {Object} elt - Element
 * @param {string} cname - (Optional) Element class name
 * @param {Object} [attrs={}] - (Optional) Element attributes
 * @returns {Object} Returns created Element
 */
const formAttrs = (el, cname, attrs = {}) => {
  try {
    if (!isEmpty(cname)) {
      el.className = cname;
    }
    if (!isEmpty(attrs)) {
      for (const key in attrs) {
        if (key === 'dataset') {
          for (const key2 in attrs[key]) {
            el[key][key2] = attrs[key][key2];
          }
        } else if (key === 'click') {
          ael(el, 'click', attrs[key]);
        } else if (key === 'mouseenter') {
          ael(el, 'mouseenter', attrs[key]);
        } else if (key === 'mouseleave') {
          ael(el, 'mouseleave', attrs[key]);
        } else if (key === 'container') {
          if (typeof key === 'function') {
            key();
          }
        } else {
          el[key] = attrs[key];
        }
      }
    }
    return el;
  } catch (ex) {
    err(ex);
    return el;
  }
};
/**
 * Create/Make Element
 * @param {string} element - Element to create
 * @param {string} cname - (Optional) Element class name
 * @param {Object} [attrs={}] - (Optional) Element attributes
 * @returns {Object} Returns created Element
 */
const make = (element, cname, attrs = {}) => {
  let el;
  try {
    el = dom.create(element);
    return formAttrs(el, cname, attrs);
  } catch (ex) {
    err(ex);
    return el;
  }
};
/**
 * Returns the cookie with the given name,
 * or undefined if not found
 * @source {@link https://javascript.info/cookie#getcookie-name}
 */
const getCookie = (name) => {
  let matches = doc.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : false;
};
/**
 * Inject CSS (Cascading Style Sheet Document) into document.head
 * @param {string} css - CSS to inject
 * @param {string} [name = 'CSS'] - (optional) Name of stylesheet (af-*)
 * @param {Object} root - (optional) Custom document.head path
 * @return {HTMLStyleElement} Style element
 */
const loadCSS = async (css, name = 'CSS', root = document) => {
  let sty;
  try {
    const head = Object.is(root, doc.head) ? root : qs('head', root || dom.search);
    if (isBlank(css)) {
      throw new Error('loadCSS', `Contains empty CSS string { ${name} }`);
    }
    if (!head) {
      throw new Error('loadCSS', `Unable to locate head Element { ${head} }`);
    }
    sty = make('style', '', {
      dataset: {
        insertedBy: 'external-translator',
        role: name
      }
    });
    for (const s of qsA('head > style', root || dom.search)) {
      if (!s.dataset) {
        continue;
      }
      if (!s.dataset.role) {
        continue;
      }
      if (Object.is(s.dataset.role, sty.dataset.role)) {
        return s;
      }
    }
    sty.textContent = css;
    if (!isEmpty(root.shadowRoot)) {
      root.shadowRoot.appendChild(sty);
    } else {
      head.appendChild(sty);
    }
    return sty;
  } catch (ex) {
    err(ex);
  }
};
const controller = new AbortController();
const signal = controller.signal;
const TET = {
  /**
   * Get Value
   * @param {string} key - Key to get the value of
   * @param {Object} def - Fallback default value of key
   * @returns {Object} Value or default value of key
   * @link https://violentmonkey.github.io/api/gm/#gm_getvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  getValue(key, def = {}) {
    try {
      const params = JSON.stringify(def);
      if (isGM) {
        return JSON.parse(GM_getValue(key, params));
      }
      return window.localStorage.getItem(`TET-${key}`)
        ? JSON.parse(window.localStorage.getItem(`TET-${key}`))
        : def;
    } catch (ex) {
      err(ex);
    }
  },
  /**
   * Get info of script
   * @returns {Object} Script info
   * @link https://violentmonkey.github.io/api/gm/#gm_info
   */
  info: isGM
    ? GM_info
    : {
        script: {
          icon: '',
          name: 'External Translator',
          namespace: 'External Translator',
          updateURL: 'https://github.com/magicoflolis/twitter-translator',
          version: 'Bookmarklet'
        }
      },
  /**
   * Open a new window
   * @param {string} url - URL of webpage to open
   * @param {object} params - GM parameters
   * @returns {object} GM_openInTab object with Window object as a fallback
   * @link https://violentmonkey.github.io/api/gm/#gm_openintab
   * @link https://developer.mozilla.org/docs/Web/API/Window/open
   */
  openInTab(
    url,
    params = {
      active: true,
      insert: true
    },
    features
  ) {
    if (!isGM && isBlank(params)) {
      params = '_blank';
    }
    if (features) {
      return win.open(url, params, features);
    }
    return isGM ? GM_openInTab(url, params) : win.open(url, params);
  },
  /**
   * Set clipboard
   * @param {string} txt - Text to copy
   * @returns {Promise} Copies text to clipboard with GM as a fallback
   * @link https://developer.mozilla.org/docs/Web/API/Clipboard/writeText
   * @link https://violentmonkey.github.io/api/gm/#gm_setclipboard
   */
  // async setClipboard(txt, type = 'text/plain') {
  //   try {
  //     return new Promise((resolve, reject) => {
  //       return navigator.clipboard.writeText(txt).then(resolve, reject);
  //     });
  //   } catch (ex) {
  //     err(`[Clipboard] Failed to copy: ${ex}`);
  //     if (isGM) {
  //       return Promise.resolve(GM_setClipboard(txt, type));
  //     }
  //   }
  // },
  /**
   * Set value
   * @param {string} key - Key to set the value of
   * @param {Object} v - Value of key
   * @returns {Promise} Saves key to either GM managed storage or webpages localstorage
   * @link https://violentmonkey.github.io/api/gm/#gm_setvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  setValue(key, v) {
    return new Promise((resolve) => {
      v = typeof v !== 'string' ? JSON.stringify(v ?? {}) : v;
      if (isGM) {
        resolve(GM_setValue(key, v));
      } else {
        resolve(window.localStorage.setItem(`TET-${key}`, v));
      }
    });
  },
  xmlRequest: isGM
    ? GM_xmlhttpRequest
    : () => {
        return {};
      },
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   * @param {string} url - The URL to fetch
   * @param {string} method - Fetch method
   * @param {string} responseType - Response type
   * @param {Object} data - Fetch parameters
   * @param {boolean} forcefetch - Force use fetch API
   * @returns {*} Fetch results
   * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
   */
  fetchURL(url = '', method = 'GET', responseType = 'json', data = {}, forcefetch = false) {
    return new Promise((resolve, reject) => {
      const params = {
        method: method.toLocaleUpperCase(),
        ...data
      };
      if (isGM && !forcefetch) {
        if (params.credentials) {
          Object.assign(params, {
            anonymous: false
          });
          if (Object.is(params.credentials, 'omit')) {
            Object.assign(params, {
              anonymous: true
            });
          }
          delete params.credentials;
        }
      } else {
        if (params.onprogress) {
          delete params.onprogress;
        }
      }
      if (responseType.match(/buffer/gi)) {
        fetch(url, {
          signal,
          ...params
        })
          .then((response) => {
            if (!response.ok) reject(response);
            resolve(response.arrayBuffer());
          })
          .catch(reject);
      } else if (isGM && !forcefetch) {
        TET.xmlRequest({
          url,
          responseType: responseType.toLocaleLowerCase(),
          ...params,
          onerror: reject,
          onload: (r) => {
            if (r.status !== 200) reject(`${r.status} ${url}`);
            if (responseType.match(/basic/gi)) resolve(r);
            resolve(r.response);
          }
        });
      } else {
        fetch(url, {
          signal,
          ...params
        })
          .then((response) => {
            if (!response.ok) reject(response);
            if (responseType.match(/json/gi)) {
              resolve(response.json());
            } else if (responseType.match(/text/gi)) {
              resolve(response.text());
            } else if (responseType.match(/blob/gi)) {
              resolve(response.blob());
            } else if (responseType.match(/document/gi)) {
              const data = new DOMParser().parseFromString(response.text(), 'text/html');
              resolve(data);
            }
            resolve(response);
          })
          .catch(reject);
      }
    });
  }
};
/** element, mouseenterFn, mouseleaveFn */
const mouseEvents = (elms, enter, leave) => {
  leave = leave ?? enter;
  if (typeof elms === 'string') {
    query(elms).then(() => {
      for (const e of normalizeTarget(elms)) {
        ael(e, 'mouseenter', enter);
        ael(e, 'mouseleave', leave);
      }
    });
  } else {
    for (const e of elms) {
      ael(e, 'mouseenter', enter);
      ael(e, 'mouseleave', leave);
    }
  }
};
const defaultDesc = "Pretend I'm a foreign language.";
const lh = domURL.host;
const find = {
  logout: !getCookie('twid'),
  nitter:
    /nitter|nittr|nttr|twitr|bird|hyper/.test(lh) ||
    lh === 'twitter.076.ne.jp' ||
    lh === 'twitter.censors.us',
  twitter: lh === 'twitter.com' || lh === 'mobile.twitter.com',
  tweetdeck: lh === 'tweetdeck.twitter.com',
  twitlonger: /twitlonger/.test(lh),
  remover: /begin_password_reset|account|logout|login|signin|signout/.test(domURL.pathname)
};
const lngFN = () => {
  for (const key in languages) {
    if (typeof win.navigator.languages !== 'undefined') {
      for (const l of win.navigator.languages) {
        if (l !== key) continue;
        dLng = l;
        break;
      }
    } else {
      dLng = win.navigator.language ?? qs('html').lang;
      break;
    }
  }
};
/** Favicons
 * Each converted to "Data URI" as to prevent blocking.
 * Direct Links
 * azure: 'https://azurecomcdn.azureedge.net/cvt-a8c88a5179d0dccbd8e4f14c3cca7706721477d322eb184796320391845f73d9/images/icon/favicon.ico',
 * bing: 'https://www.bing.com/th?id=OTT.7A274AA188550691D09FA80F322A58D2&pid=Trans',
 * deepl: 'https://static.deepl.com/img/favicon/favicon_16.png',
 * gCloud: 'https://www.gstatic.com/devrel-devsite/prod/v48d5b7fe78425d6a73163cf28706f05fb6b7cff97bdc98bbcd2f38818604a511/cloud/images/favicons/onecloud/favicon.ico',
 * google: 'https://ssl.gstatic.com/translate/favicon.ico',
 * libre: 'https://github.com/LibreTranslate/LibreTranslate/tree/main/app/static',
 * lingva: 'https://github.com/thedaviddelta/lingva-translate/tree/main/public',
 * mymemory: 'https://mymemory.translated.net/public/img/favicon-16x16.png',
 * translate: 'https://www.translate.com/next/images/favicon/favicon.svg',
 * yandex: 'https://translate.yandex.com/icons/favicon.ico',
 */
const iconData = {
  cache: new Map(),
  sources: {
    azure: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/azure.ico`,
    bing: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/bing.svg`,
    deepl: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/deepl.png`,
    gCloud: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/googlecloud.ico`,
    google: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/google.ico`,
    libre: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/libre.ico`,
    lingva: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/lingva.png`,
    mymemory: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/mymemory.png`,
    translate: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/translate.svg`,
    yandex: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/yandex.ico`
  },
  async fn() {
    const toDataURL = (str) => {
      return new Promise((resolve) => {
        TET.fetchURL(str, 'GET', 'blob').then((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      });
    };
    const makeImg = async (str) => {
      try {
        return await new Promise((resolve) => {
          toDataURL(str).then((data) => {
            const img = new Image();
            dom.cl.add(img, 'tet-favicon');
            img.src = data;
            img.onload = () => resolve(img.outerHTML);
            img.onerror = (ex) => {
              err(ex);
              resolve(`<img class="tet-favicon" src="${data}"/>`);
            };
          });
        });
      } catch (ex) {
        return err(ex);
      }
    };
    for (const key in this.sources) {
      try {
        const imgPreview = await makeImg(this.sources[key]);
        this.cache.set(key, imgPreview);
      } catch (ex) {
        err('iconData.fn()', key, ex);
      }
    }
  }
};
const halt = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const save = () => {
  try {
    TET.setValue('Config', cfg);
  } catch (ex) {
    err(ex);
  }
};
/**
 * @param {Node} element
 * @param {MutationCallback} callback
 * @param {MutationObserverInit} options
 */
const observe = (element, callback, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(callback);
  callback([], observer);
  observer.observe(element, options);
  return observer;
};
const nav = make('div', 'navbackground rm');
const tetConfirm = make('div', 'tetConfirmation tetBackground rm', {
  innerHTML: `<h1 class="tetConfirmTxt tetTextColor"><span>${languages.en.quest.head}</span></h1>
<div class="tetConfirmTxt tetTextColor"><span>${languages.en.quest.body}</span></div>
<div class="tetConfirmBtns confirm tetBtn" style="background-color: rgb(239, 243, 244);" data-testid="confirmationSheetConfirm">
  <div style="color: rgb(15, 20, 25);"><span><span class="tet-confirm">${languages.en.quest.yes}</span></span></div>
</div>
<div class="tetConfirmBtns deny tetDisplayColor tetBtn" data-testid="confirmationSheetCancel">
  <div style="color: rgb(239, 243, 244);"><span><span class="tet-deny">${languages.en.quest.no}</span></span></div>
</div>`
});
const tetHeader = make('div', 'tet-header tetTextColor', {
  innerHTML: `<span class="tet-info-name">${TET.info.script.name} Settings</span><span class="tetTextColor tet-info">v${TET.info.script.version}</span>`
});
const tetMain = make('div', 'tet-main', {
  innerHTML: `<div class="r-demo tetBackground">
  <div class="tet-av">
    <div class="tetAvatarFrame">
    </div>
  </div>
  <div class="tet-txt">
    <div class="txt-header">
      <div class="tet-at tetTextColor"><span>${
        TET.info.script.name
      }</span><span class="tetTextColor">@for_lollipops</span></div>
    </div>
    <div class="tetTextColor tet-dc"><span class="tet-demotext">${
      isGM ? defaultDesc : 'ERROR Unable to resolve GM_ or GM. objects'
    }</span></div>
    <div id="tetDemo" class="tetSub"></div>
  </div>
  </div>
  <div id="tetSelector" class="tetBackground">
  <div id="tetName" class="tetTextColor"><span>${languages.en.lg}</span></div>
  <select id="languages" name="languages" class="tetTextColor">
    <option class="tetBackground" value="en">${languages.en.sel}</option>
    <option class="tetBackground" value="es">${languages.es.sel}</option>
    <option class="tetBackground" value="ja">${languages.ja.sel}</option>
    <option class="tetBackground" value="ru">${languages.ru.sel}</option>
    <option class="tetBackground" value="zh">${languages.zh.sel}</option>
    <option class="tetBackground" value="bg">${languages.bg.sel}</option>
    <option class="tetBackground" value="cs">${languages.cs.sel}</option>
    <option class="tetBackground" value="da">${languages.da.sel}</option>
    <option class="tetBackground" value="de">${languages.de.sel}</option>
    <option class="tetBackground" value="el">${languages.el.sel}</option>
    <option class="tetBackground" value="et">${languages.et.sel}</option>
    <option class="tetBackground" value="fi">${languages.fi.sel}</option>
    <option class="tetBackground" value="fr">${languages.fr.sel}</option>
    <option class="tetBackground" value="hu">${languages.hu.sel}</option>
    <option class="tetBackground" value="it">${languages.it.sel}</option>
    <option class="tetBackground" value="lv">${languages.lv.sel}</option>
    <option class="tetBackground" value="lt">${languages.lt.sel}</option>
    <option class="tetBackground" value="nl">${languages.nl.sel}</option>
    <option class="tetBackground" value="pl">${languages.pl.sel}</option>
    <option class="tetBackground" value="pt">${languages.pt.sel}</option>
    <option class="tetBackground" value="ro">${languages.ro.sel}</option>
    <option class="tetBackground" value="sk">${languages.sk.sel}</option>
    <option class="tetBackground" value="sl">${languages.sl.sel}</option>
    <option class="tetBackground" value="sv">${languages.sv.sel}</option>
  </select>
  </div>
  <div id="tetSelector" class="tetBackground">
  <div id="tetName" class="tetTextColor"><span>${languages.en.tr}</span></div>
  <select id="translator" name="translator" class="tetTextColor">
    <optgroup class="tetBackground" label="External Translators ⤴">
      <option class="tetBackground" value="bing">Bing Translate</option>
      <option class="tetBackground" value="deepl">DeepL Translator ✨</option>
      <option class="tetBackground" value="google">Google Translate</option>
      <option class="tetBackground" value="lingva">Lingva Translate</option>
      <option class="tetBackground" value="mymemory">MyMemory</option>
      <option class="tetBackground" value="translate">Translate.com</option>
      <option class="tetBackground" value="yandex">Yandex Translator</option>
    </optgroup>
    <optgroup class="tetBackground" label="Internal Translators ⤵">
      <option class="tetBackground" value="bingIT">Azure Cognitive Services</option>
      <option class="tetBackground" value="deeplIT">DeepL</option>
      <option class="tetBackground" value="googleIT">Google Cloud</option>
      <option class="tetBackground" value="libre">LibreTranslate</option>
      <option class="tetBackground" value="lingvaIT">Lingva Translate ✨</option>
      <option class="tetBackground" value="mymemoryIT">MyMemory</option>
      <option class="tetBackground" value="translateIT">Translation API</option>
      <option class="tetBackground" value="yandexIT">Yandex Translate API</option>
    </optgroup>
  </select>
  </div>
  <div id="tetSelector" class="tetBackground">
  <div id="tetName" class="tetTextColor"><span>${languages.en.ds}</span></div>
  <select id="display" name="display" class="tetTextColor">
    <option class="tetBackground" value="text + icon">Text + Icon</option>
    <option class="tetBackground" value="text">${languages.en.t}</option>
    <option class="tetBackground" value="icon">${languages.en.i}</option>
  </select>
  </div>
  <div id="tetSelector" class="tetBackground">
  <div id="tetName" class="tetTextColor"><span>${languages.en.col}</span></div>
  <select id="colorselect" name="colorselect" class="tetTextColor">
    <optgroup class="tetBackground" label="Twitter">
      <option class="tetBackground" value="tet-29u">${languages.en.cb}</option>
      <option class="tetBackground" value="tet-186u">${languages.en.cg}</option>
      <option class="tetBackground" value="tet-122u">${languages.en.co}</option>
      <option class="tetBackground" value="tet-120u">${languages.en.cp}</option>
      <option class="tetBackground" value="tet-249u">${languages.en.cr}</option>
      <option class="tetBackground" value="tet-255u">${languages.en.cy}</option>
    <optgroup class="tetBackground" label="Misc">
      <option class="tetBackground" value="auto">${languages.en.ao}</option>
      <option class="tetBackground" value="nitter">Nitter</option>
      <option class="tetBackground" value="tweetdeck">TweetDeck</option>
    </optgroup>
  </select>
  </div>
  <div id="tetSelector" class="tetBackground">
  <div id="tetName" class="tetTextColor"><span>${languages.en.th}</span></div>
  <select id="theme" name="theme" class="tetTextColor">
    <optgroup class="tetBackground" label="Twitter">
      <option class="tetBackground" value="twdef">${languages.en.df}</option>
      <option class="tetBackground" value="twdim">${languages.en.di}</option>
      <option class="tetBackground" value="twlo">${languages.en.lo}</option>
    </optgroup>
    <optgroup class="tetBackground" label="Misc">
      <option class="tetBackground" value="auto">${languages.en.ao}</option>
      <option class="tetBackground" value="nitter">Nitter</option>
      <option class="tetBackground" value="tweetdeck">TweetDeck</option>
    </optgroup>
  </select>
  </div>
  <input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields deepl">
  <div id="tetSelector" class="tetBackground tetFields deepl">
  <div id="tetName"><span>Version</span></div>
  <select id="api-version" name="api-version" class="tetTextColor">
    <option class="tetBackground" value="api-free">Free</option>
    <option class="tetBackground" value="api-pro">Pro</option>
  </select>
  </div>
  <input id="apifield" type="url" name="apikey" placeholder="(OPTIONAL) PASTE URL" class="tetTextColor tetBackground tet-url">
  <input id="apifield" type="password" name="apikey" placeholder="(OPTIONAL) PASTE API KEY" class="tetTextColor tetBackground tetFields libre">
  <input id="apifield" type="url" name="apikey" placeholder="PASTE URL" class="tetTextColor tetBackground tetFields libre">
  <input id="apifield" type="password" name="apikey" placeholder="PASTE FOLDER ID" class="tetTextColor tetBackground tetFields yandex">
  <input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields translate">
  <input id="apifield" type="url" name="apikey" placeholder="PASTE URL" class="tetTextColor tetBackground tetFields lingva">
  <input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields google">
  <input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields bing">
  <div id="tetReset" class="tetDisplayColor tetBtn">Defaults</div>`
});
const tetForm = make('div', 'tetBackground rm', { id: 'tetForm' });
const tetAdv = make('div', 'rm', {
  id: 'tetadvanced',
  innerHTML: `<div class="tetBackground">
  <div class="tet-header tetTextColor">
    <span class="tet-info-name">Advanced Config</span>
    <span></span>
  </div>
  <div class="tet-main tet-container tetadvanced-container">
    <div id="tetSelector" class="tetBackground">
      <div id="tetName"><span>Delay Injection</span></div>
      <select id="delayInject" name="delayInject" class="tetTextColor">
        <option class="tetBackground" value="none">0ms (${languages.en.df})</option>
        <option class="tetBackground" value="500">500ms</option>
        <option class="tetBackground" value="1000">1000ms</option>
        <option class="tetBackground" value="1500">1500ms</option>
        <option class="tetBackground" value="2000">2000ms</option>
        <option class="tetBackground" value="2500">2500ms</option>
        <option class="tetBackground" value="3000">3000ms</option>
        <option class="tetBackground" value="3500">3500ms</option>
        <option class="tetBackground" value="4000">4000ms</option>
        <option class="tetBackground" value="4000">4500ms</option>
        <option class="tetBackground" value="5000">5000ms</option>
      </select>
    </div>
    <section class="tetcheckbox">
      <label class="tetTextColor">
        <span>Debug</span>
        <div class="tetswitch tetDisplayColor">
          <input type="checkbox" name="debug" id="debug" />
          <label for="debug"></label>
        </div>
      </label>
    </section>
    <section class="tetcheckbox tet-ac">
      <label class="tetTextColor">
        <span>Bios</span>
        <div class="tetswitch tetDisplayColor">
          <input type="checkbox" name="tetbio" id="tetbio" />
          <label for="tetbio"></label>
        </div>
      </label>
    </section>
    <section class="tetcheckbox tet-ac tetmsg">
      <label class="tetTextColor">
        <span>Direct Messages</span>
        <div class="tetswitch tetDisplayColor">
          <input type="checkbox" name="dmsg" id="dmsg" />
          <label for="dmsg"></label>
        </div>
      </label>
    </section>
    <section class="tetcheckbox tet-ac">
      <label class="tetTextColor">
        <span>Tweets + Replies</span>
        <div class="tetswitch tetDisplayColor">
          <input type="checkbox" name="tetctw" id="tetctw" />
          <label for="tetctw"></label>
        </div>
      </label>
    </section>
    <section class="tetcheckbox tetst">
      <label class="tetTextColor">
        <span>Website Theme</span>
        <div class="tetswitch tetDisplayColor">
          <input type="checkbox" name="sitetheme" id="sitetheme" />
          <label for="sitetheme"></label>
        </div>
      </label>
    </section>
    <div id="tetNI" class="tetDisplayColor tetBtn">Fetch Latest Nitter Instances</div>
  </div>
</div>`
});
const tetAdvC = make('div', 'rm tetadvanced-icon-container', {
  innerHTML:
    '<svg viewBox="0 0 24 24" class="tetadvanced-icon tetTextColor"><g><path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path><path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path></g></svg>',
  click: () => {
    dom.cl.add(qs('.tet-help-container'), 'rm');
    dom.cl.toggle(qs('[id="tetadvanced"]'), 'rm');
  }
});
const tetAdvI = make('div', 'rm tet-icon-container', {
  innerHTML: `<a class="tet-icon-info tetDisplayColor" title="Help">?</a>
  <div class="rm tetBackground tet-help-container">
    <a class="tet-help-info tetTextColor" href="${TET.info.script.namespace}" target="_blank">Visit GitHub ⤴</a>
  </div>`
});
const mkMenuSVG = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dom.attr(
    p,
    'd',
    'M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm8.472 9.442c-.242.19-.472.368-.63.486-.68-1.265-1.002-1.78-1.256-2.007-.163-.145-.37-.223-.78-.375-.367-.136-1.482-.55-1.65-.85-.087-.153.136-.602.23-.793.088-.177.164-.33.196-.497.123-.646-.33-1.146-.728-1.59-.066-.072-.153-.17-.23-.26.335-.12.862-.26 1.42-.384 1.95 1.448 3.26 3.704 3.428 6.272zm-9.788-7.83c.076.25.145.5.182.678-.255.15-.663.363-.96.52-.262.136-.522.273-.738.392-.247.137-.442.234-.6.313-.347.174-.598.3-.833.553-.068.073-.26.278-1.02 1.886l-1.79-.656c1.293-1.94 3.362-3.31 5.76-3.685zM12 20.5c-4.687 0-8.5-3.813-8.5-8.5 0-1.197.25-2.335.7-3.37.47.182 1.713.66 2.75 1.035-.107.336-.245.854-.26 1.333-.03.855.502 1.7.562 1.792.053.08.12.15.2.207.303.21.687.5.827.616.063.343.166 1.26.23 1.833.144 1.266.175 1.48.24 1.65.005.012.514 1.188 1.315 1.188.576-.003.673-.206 1.855-2.688.244-.512.45-.95.513-1.058.1-.144.597-.61.87-.83.55-.442.76-1.82.413-2.682-.335-.83-1.92-2.08-2.5-2.195-.17-.033-.43-.04-.953-.053-.497-.01-1.25-.028-1.536-.09-.098-.024-.314-.094-.605-.196.32-.668.627-1.28.71-1.4.05-.052.168-.112.408-.234.17-.086.383-.192.653-.34.208-.116.458-.247.71-.38 1.168-.612 1.484-.8 1.658-1.082.11-.177.263-.44-.04-1.544 1.042.027 2.038.24 2.955.61-.89.32-1.024.595-1.106.77-.367.784.256 1.475.667 1.93.096.107.24.268.32.38l-.017.036c-.234.472-.67 1.35-.196 2.194.406.72 1.384 1.13 2.437 1.52.134.05.25.092.33.126.16.208.496.79 1 1.735l.154.285c.078.14.33.505.842.505.167 0 .363-.04.59-.137.032-.013.083-.035.18-.094C19.72 17.405 16.22 20.5 12 20.5zm-3.812-9.45c.01-.285.102-.646.184-.907l.027.006c.397.09 1.037.11 1.83.13.32.006.59.008.615 0 .326.143 1.355 1 1.483 1.31.113.28.05.812-.034 1.01-.233.197-.845.735-1.085 1.078-.093.13-.212.373-.64 1.274-.133.276-.313.654-.488 1.013-.026-.225-.054-.472-.08-.686-.225-2.003-.273-2.22-.42-2.445-.05-.078-.202-.31-1.135-.973-.117-.213-.268-.564-.26-.813z'
  );
  g.append(p);
  dom.attr(svg, 'viewBox', '0 0 24 24');
  dom.attr(svg, 'width', '1em');
  dom.attr(svg, 'height', '1em');
  dom.attr(svg, 'id', 'tetSVG');
  dom.cl.add(svg, 'tetTextColor');
  svg.append(g);
  return svg;
};
const menuSvg = mkMenuSVG();
const menuSpan = make('span', '', { innerHTML: languages.en.menu });
const tetMenuButton = make('div', 'mini tetDisplayColor tetBtn', {
  id: 'tetMenuButton',
  title: languages.en.menu,
  click: (e) => {
    dom.cl.remove([nav, tetForm, tetAdvI, tetAdvC], 'rm');
    dom.attr(btNav, 'style', 'z-index: 10000 !important');
    dom.cl.toggle(e.target, 'mini');
    dom.cl.add(dom.html, 'tetFreeze');
  },
  onmouseenter: (e) => {
    dom.cl.toggle(e.target, cHover);
    dom.attr(menuSvg, 'style', 'display: none;');
    dom.cl.toggle(e.target, 'mini');
  },
  onmouseleave: (e) => {
    dom.cl.toggle(e.target, cHover);
    dom.attr(menuSvg, 'style', 'display: inline;');
    dom.cl.toggle(e.target, 'mini');
    delay(5000).then(() => dom.attr(menuSvg, 'style', 'display: none;'));
  }
});
const btNav = make('div', 'btNav', {
  id: 'tetTW',
  role: 'dialog',
  style: 'z-index: -1 !important;'
});
// Couldn't figure out how to make my own
// invalid_chars from https://greasyfork.org/scripts/423001
const invalid_chars = {
  '\\': '＼',
  '/': '／',
  '|': '｜',
  '<': '＜',
  '>': '＞',
  ':': '：',
  '*': '＊',
  '?': '？',
  '"': '＂',
  '🔞': '',
  '#': ''
};
const elmFN = (elem, encode = true) => {
  // const txtFilter = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}\p{Po}\p{So}\p{Sc}\d]/gu.exec(dom.text(elem));
  const txtFilter =
    dom.text(elem).match(/[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}\p{Po}\p{So}\p{Sc}\d]/gu) || [];
  let content = '';
  for (const key of txtFilter) {
    content += key.replace(/[\\/|<>*?:#"]/g, (v) => invalid_chars[v]);
  }
  if (encode) {
    return encodeURIComponent(content);
  }
  return content;
};
const langChange = (lchange) => {
  info('Updating language');
  let cfglng = cfg.lang ?? 'en';
  if (lchange) {
    lng = {};
    cfglng = lchange ?? cfglng;
  }
  for (const key in languages) {
    if (key !== cfglng) continue;
    if (!hasOwn(lng, key)) {
      lng[key] = languages[key];
    } else if (key === 'quest') {
      for (const key3 in languages[key]) {
        if (!hasOwn(lng[key], key3)) {
          lng[key][key3] = languages[key][key3];
        }
      }
    }
  }
  lng[cfglng]['ti'] = `${lng[cfglng]['t']} + ${lng[cfglng]['i']}`;
  dbg('Language:', lng);
};
//#region Site n Menu Fn
const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
const obi = (onDOMCreated, onDOMChanged) => {
  let removedNodes = false;
  let domLayoutObserver;

  const addedNodes = [];
  const addedNodeLists = [];
  const removedNodeLists = [];
  const safeObserverHandler = () => {
    let i = addedNodeLists.length;
    // eslint-disable-next-line no-plusplus
    while (i--) {
      const nodeList = addedNodeLists[i];
      let iNode = nodeList.length;
      // eslint-disable-next-line no-plusplus
      while (iNode--) {
        const node = nodeList[iNode];
        if (node.nodeType !== 1) {
          continue;
        }
        if (ignoreTags.has(node.localName)) {
          continue;
        }
        if (node.parentElement === null) {
          continue;
        }
        addedNodes.push(node);
      }
    }
    addedNodeLists.length = 0;
    i = removedNodeLists.length;
    // eslint-disable-next-line no-plusplus
    while (i-- && removedNodes === false) {
      const nodeList = removedNodeLists[i];
      let iNode = nodeList.length;
      // eslint-disable-next-line no-plusplus
      while (iNode--) {
        if (nodeList[iNode].nodeType !== 1) {
          continue;
        }
        removedNodes = true;
        break;
      }
    }
    removedNodeLists.length = 0;
    if (addedNodes.length === 0 && removedNodes === false) {
      return;
    }
    if (typeof onDOMChanged === 'function' || onDOMChanged instanceof Function) {
      onDOMChanged(addedNodes, removedNodes);
    }
    addedNodes.length = 0;
    removedNodes = false;
  };
  const observerHandler = (mutations) => {
    let i = mutations.length;
    while (i--) {
      const mutation = mutations[i];
      let nodeList = mutation.addedNodes;
      if (nodeList.length !== 0) {
        addedNodeLists.push(nodeList);
      }
      nodeList = mutation.removedNodes;
      if (nodeList.length !== 0) {
        removedNodeLists.push(nodeList);
      }
    }
    if (addedNodeLists.length !== 0 || removedNodeLists.length !== 0) {
      safeObserverHandler();
    }
  };
  const startObserver = () => {
    if (domLayoutObserver !== undefined) {
      return;
    }
    domLayoutObserver = new MutationObserver(observerHandler);
    domLayoutObserver.observe(document, {
      childList: true,
      subtree: true
    });
  };
  if (typeof onDOMCreated === 'function' || onDOMCreated instanceof Function) {
    onDOMCreated();
  }
  startObserver();
};
async function configDisplay() {
  const getIcon = (icon) => {
    const resp = iconData.cache.get(icon);
    return isEmpty(resp) ? '' : resp;
  };
  return new Promise((resolve) => {
    const dis = cfg.display;
    const tra = cfg.translator;
    if (!dis) throw new Error(`cfg.display is undefined ${dis}`);
    if (dis === 'text + icon') {
      tra.match(/lingva/gi)
        ? resolve(`Lingva Translate ${getIcon('lingva')}`)
        : tra.match(/libre/gi)
        ? resolve(`LibreTranslate ${getIcon('libre')}`)
        : tra == 'bingIT'
        ? resolve(`Azure Cognitive Services ${getIcon('azure')}`)
        : tra == 'bing'
        ? resolve(`Bing ${getIcon('bing')}`)
        : tra == 'googleIT'
        ? resolve(`Google Cloud ${getIcon('gCloud')}`)
        : tra == 'google'
        ? resolve(`Google ${getIcon('google')}`)
        : tra.match(/mymemory/gi)
        ? resolve(`MyMemory ${getIcon('mymemory')}`)
        : tra.match(/translate/gi)
        ? resolve(`Translate.com ${getIcon('translate')}`)
        : tra.match(/yandex/gi)
        ? resolve(`Yandex ${getIcon('yandex')}`)
        : resolve(`DeepL ${getIcon('deepl')}`);
    } else if (dis === 'icon') {
      tra.match(/lingva/gi)
        ? resolve(getIcon('lingva'))
        : tra.match(/libre/gi)
        ? resolve(getIcon('libre'))
        : tra == 'bingIT'
        ? resolve(getIcon('azure'))
        : tra == 'bing'
        ? resolve(getIcon('bing'))
        : tra == 'googleIT'
        ? resolve(getIcon('gCloud'))
        : tra == 'google'
        ? resolve(getIcon('google'))
        : tra.match(/mymemory/gi)
        ? resolve(getIcon('mymemory'))
        : tra.match(/translate/gi)
        ? resolve(getIcon('translate'))
        : tra.match(/yandex/gi)
        ? resolve(getIcon('yandex'))
        : resolve(getIcon('deepl'));
    } else {
      tra.match(/lingva/gi)
        ? resolve('Lingva Translate')
        : tra.match(/libre/gi)
        ? resolve('LibreTranslate')
        : tra == 'bingIT'
        ? resolve('Azure Cognitive Services')
        : tra == 'bing'
        ? resolve('Bing')
        : tra == 'googleIT'
        ? resolve('Google Cloud')
        : tra == 'google'
        ? resolve('Google')
        : tra.match(/mymemory/gi)
        ? resolve('MyMemory')
        : tra.match(/translate/gi)
        ? resolve('Translate.com')
        : tra.match(/yandex/gi)
        ? resolve('Yandex')
        : resolve('DeepL');
    }
  })
    .then((display) => {
      const tw = lng[cfg.lang ?? 'en'].tw;
      qs('#tetDemo').innerHTML = `${tw} ${display}`;
      if (!qs('.tet')) return;
      for (const t of qsA('.tet')) {
        t.innerHTML = `${tw} ${display}`;
      }
    })
    .catch(err);
}
const translate = async (elem, btnDiv, srcLang = 'auto', content = '') => {
  const tr = cfg.translator;
  if (elem.parentElement.contains(btnDiv)) {
    dom.cl.toggle(btnDiv, 'rm');
    return 'Already exists';
  }
  if (tr.match(/IT|libre/gi)) {
    elem.innerHTML = `${lng[cfg.lang].l}...`;
    if (tr.match(/lingva/gi)) {
      return TET.fetchURL(`${cfg.url.lingva}/api/v1/${srcLang}/${cfg.lang}/${content}`);
    } else if (tr.match(/libre/gi)) {
      return TET.fetchURL(cfg.url.libre, 'POST', {
        body: JSON.stringify({
          q: content,
          source: srcLang,
          target: cfg.lang,
          format: 'text',
          api_key: cfg.api.libre
        })
      });
    } else if (tr.match(/bing/gi)) {
      return 'Work in progress';
    } else if (tr.match(/google/gi)) {
      return TET.fetchURL(
        `${cfg.url[tr]}/language/translate/v2?q=${content}&target=${cfg.lang}&source=${srcLang}&key=${cfg.api.google}`
      )
    } else if (tr.match(/mymemory/gi)) {
      return TET.fetchURL(`${cfg.url[tr]}/get?q=${content}&langpair=${srcLang}|${cfg.lang}`)
    } else if (tr.match(/translate/gi)) {
      await TET.fetchURL('https://api.translate.com/translate/v1/login', 'POST', {
        body: JSON.stringify({
          email: srcLang,
          password: cfg.lang
        })
      })
      return TET.fetchURL(cfg.url[tr], 'POST', {
        body: JSON.stringify({
          text: content,
          source_language: srcLang,
          translation_language: cfg.lang
        })
      })
    } else if (tr.match(/yandex/gi)) {
      return TET.fetchURL(cfg.url[tr], 'POST', {
        body: JSON.stringify({
          sourceLanguageCode: srcLang,
          targetLanguageCode: cfg.lang,
          format: 'string',
          texts: [content],
          folderId: cfg.api.yandex
        })
      })
    } else if (tr.match(/deepl/gi)) {
      return TET.fetchURL(
        `https://${
          cfg.api.version.match(/pro/gi) ? 'api' : 'api-free'
        }.deepl.com/v2/translate?auth_key=${cfg.api.deepl}&text=${content}&target_lang=${
          cfg.lang
        }`
      )
    }
    return 'Unable to locate selected translator';
  }
  if (tr.match(/lingva/gi)) {
    return `${cfg.url[tr]}/${srcLang}/${cfg.lang}/${content}`;
  } else if (tr.match(/bing/gi)) {
    return `${cfg.url[tr]}/translator/?text=${content}&from=${srcLang}&to=${cfg.lang}`;
  } else if (tr.match(/google/gi)) {
    return `${cfg.url[tr]}/?q=${content}&sl=${srcLang}&tl=${cfg.lang}`;
  } else if (tr.match(/mymemory/gi)) {
    return `${cfg.url[tr]}/${cfg.lang}/${srcLang}/${cfg.lang}/${content}`;
  } else if (tr.match(/translate/gi)) {
    return `${cfg.url[tr]}/machine-translation#${srcLang}/${cfg.lang}/${content}`;
  } else if (tr.match(/yandex/gi)) {
    return `${cfg.url[tr]}/?lang=${srcLang}-${cfg.lang}&text=${content}`;
  } else if (tr.match(/deepl/gi)) {
    return `${cfg.url[tr]}/translator#${srcLang}/${cfg.lang}/${content}`;
  }
  return 'Unable to locate selected translator';
}
/** Src Element, Src Language, Src Content, Inject Mode */
function handleButton(source, srcLang = 'auto', content = '', mode = 'append', extras = {}) {
  mode = isEmpty(mode) ? 'append' : mode;
  srcLang = isEmpty(srcLang) ? 'auto' : srcLang;
  const ntStyle = 'margin: 0px 0px 0px 58px !important; padding: .75em;';
  const btnDiv = make('div', `tetTextColor ${cText}`, { id: 'tweet-text' });
  const btnSpan = make('span');
  btnDiv.append(btnSpan);
  const tetBtn = make('div', `tet ${cSub}`, {
    mouseenter: (e) => dom.cl.add(e.target, 'r-hover'),
    mouseleave: (e) => dom.cl.remove(e.target, 'r-hover'),
    onclick: (e) => {
      halt(e);
      if (e.target.innerHTML.match(/error/i)) {
        e.target.remove();
        btnDiv.remove();
      }
      // let tr = cfg.translator;
      // const findTR = () => {
      //   if (e.target.parentElement.contains(btnDiv)) {
      //     dom.cl.toggle(btnDiv, 'rm');
      //     return 'Already exists';
      //   }
      //   return new Promise((resolve, reject) => {
      //     if (tr.match(/IT|libre/gi)) {
      //       e.target.innerHTML = `${lng[cfg.lang].l}...`;
      //       if (tr.match(/lingva/gi)) {
      //         resolve(TET.fetchURL(`${cfg.url.lingva}/api/v1/${srcLang}/${cfg.lang}/${content}`));
      //       } else if (tr.match(/libre/gi)) {
      //         resolve(
      //           TET.fetchURL(cfg.url.libre, 'POST', {
      //             body: JSON.stringify({
      //               q: content,
      //               source: srcLang,
      //               target: cfg.lang,
      //               format: 'text',
      //               api_key: cfg.api.libre
      //             })
      //           })
      //         );
      //       } else if (tr.match(/bing/gi)) {
      //         reject('Work in progress');
      //       } else if (tr.match(/google/gi)) {
      //         resolve(
      //           TET.fetchURL(
      //             `${cfg.url[tr]}/language/translate/v2?q=${content}&target=${cfg.lang}&source=${srcLang}&key=${cfg.api.google}`
      //           )
      //         );
      //       } else if (tr.match(/mymemory/gi)) {
      //         resolve(
      //           TET.fetchURL(`${cfg.url[tr]}/get?q=${content}&langpair=${srcLang}|${cfg.lang}`)
      //         );
      //       } else if (tr.match(/translate/gi)) {
      //         resolve(
      //           TET.fetchURL('https://api.translate.com/translate/v1/login', 'POST', {
      //             body: JSON.stringify({
      //               email: srcLang,
      //               password: cfg.lang
      //             })
      //           }).then(() => {
      //             TET.fetchURL(cfg.url[tr], 'POST', {
      //               body: JSON.stringify({
      //                 text: content,
      //                 source_language: srcLang,
      //                 translation_language: cfg.lang
      //               })
      //             });
      //           })
      //         );
      //       } else if (tr.match(/yandex/gi)) {
      //         resolve(
      //           TET.fetchURL(cfg.url[tr], 'POST', {
      //             body: JSON.stringify({
      //               sourceLanguageCode: srcLang,
      //               targetLanguageCode: cfg.lang,
      //               format: 'string',
      //               texts: [content],
      //               folderId: cfg.api.yandex
      //             })
      //           })
      //         );
      //       } else if (tr.match(/deepl/gi)) {
      //         resolve(
      //           TET.fetchURL(
      //             `https://${
      //               cfg.api.version.match(/pro/gi) ? 'api' : 'api-free'
      //             }.deepl.com/v2/translate?auth_key=${cfg.api.deepl}&text=${content}&target_lang=${
      //               cfg.lang
      //             }`
      //           )
      //         );
      //       }
      //       reject('Unable to locate selected translator');
      //     }
      //     if (tr.match(/lingva/gi)) {
      //       resolve(`${cfg.url[tr]}/${srcLang}/${cfg.lang}/${content}`);
      //     } else if (tr.match(/bing/gi)) {
      //       resolve(`${cfg.url[tr]}/translator/?text=${content}&from=${srcLang}&to=${cfg.lang}`);
      //     } else if (tr.match(/google/gi)) {
      //       resolve(`${cfg.url[tr]}/?q=${content}&sl=${srcLang}&tl=${cfg.lang}`);
      //     } else if (tr.match(/mymemory/gi)) {
      //       resolve(`${cfg.url[tr]}/${cfg.lang}/${srcLang}/${cfg.lang}/${content}`);
      //     } else if (tr.match(/translate/gi)) {
      //       resolve(`${cfg.url[tr]}/machine-translation#${srcLang}/${cfg.lang}/${content}`);
      //     } else if (tr.match(/yandex/gi)) {
      //       resolve(`${cfg.url[tr]}/?lang=${srcLang}-${cfg.lang}&text=${content}`);
      //     } else if (tr.match(/deepl/gi)) {
      //       resolve(`${cfg.url[tr]}/translator#${srcLang}/${cfg.lang}/${content}`);
      //     }
      //     reject('Unable to locate selected translator');
      //   });
      // };
      // findTR()
      translate(e.target, btnDiv, srcLang, content).then((r) => {
          configDisplay();
          if (typeof r === 'string') {
            if (r.match(/already exists/i)) return;
            return TET.openInTab(r);
          }
          const resp = () => {
            for (const k in r) {
              return k.includes('translation')
                ? r.translation
                : k.includes('responseData')
                ? r.responseData.translatedText
                : k.includes('data')
                ? r.data.translations[0].translatedText ?? r.data.translation
                : k.includes('translatedText')
                ? r.translatedText
                : k.includes('translations')
                ? r.translations[0].text
                : r;
            }
          };
          btnSpan.innerHTML = resp();
          if (!e.target.parentElement.contains(btnDiv)) {
            e.target.after(btnDiv);
          }
        })
        .catch((ex) => {
          err(ex);
          btnSpan.innerHTML += `---> ${JSON.stringify(ex, null, ' ')}`;
          if (!e.target.parentElement.contains(btnDiv)) e.target.after(btnDiv);
          e.target.innerHTML = 'Encounted an Error';
        });
    },
    ...extras
  });

  /append|after|before|prepend/i.test(mode)
    ? source[mode](tetBtn)
    : mode === 'afterend'
    ? source.insertAdjacentHTML('afterend', tetBtn)
    : mode === 'tdTweet'
    ? source.after(tetBtn)
    : mode === 'tdBio'
    ? source.after(tetBtn)
    : mode === 'nitter'
    ? (source.after(tetBtn), dom.attr([tetBtn, btnDiv], 'style', ntStyle))
    : mode.prepend(tetBtn);

  configDisplay();
}
//#endregion

//#region Sites
const trigDelay = (callback) => {
  if (cfg.delay === 'none') {
    callback();
    return;
  }
  delay(cfg.delay).then(callback);
};
const site = {
  nitter() {
    const twtFN = () => {
      for (const tc of qsA('.tweet-content')) {
        if (
          !tc.parentElement.parentElement.nextElementSibling ||
          !tc.parentElement.parentElement.nextElementSibling.className.includes('tet')
        ) {
          const c = elmFN(tc);
          handleButton(tc.parentElement.parentElement, 'auto', c, 'nitter');
        }
      }
    };
    trigDelay(twtFN);
  },
  tweetdeck(elem) {
    try {
      const twtFN = () => {
        const item = qs('p.js-tweet-text', elem);
        if (item.lang) {
          if (item.lang.includes(languages[cfg.lang ?? 'en']) && !item.nextElementSibling) return;
          if (!item.nextElementSibling) return;
          if (!item.nextElementSibling.className.includes('js-translate-call-to-action')) return;
          if (!item.nextElementSibling.nextElementSibling) return;
          if (item.nextElementSibling.nextElementSibling.className.includes('tet')) return;
          const c = elmFN(item);
          handleButton(item.nextElementSibling, item.lang, c, 'tdTweet');
        } else {
          if (!item.nextElementSibling) return;
          if (item.nextElementSibling.className.includes('tet')) return;
          const c = elmFN(item);
          handleButton(item, 'auto', c, 'tdTweet');
        }
        // for (const item of qsA('p.js-tweet-text', elem)) {
        //   if (item.lang) {
        //     if (item.lang.includes(languages[cfg.lang ?? 'en']) && !item.nextElementSibling)
        //       continue;
        //     if (!item.nextElementSibling) continue;
        //     if (!item.nextElementSibling.className.includes('js-translate-call-to-action'))
        //       continue;
        //     if (!item.nextElementSibling.nextElementSibling) continue;
        //     if (item.nextElementSibling.nextElementSibling.className.includes('tet')) continue;
        //     elmFN(item).then((c) => {
        //       handleButton(item.nextElementSibling, item.lang, c, 'tdTweet');
        //     });
        //   } else {
        //     if (!item.nextElementSibling) continue;
        //     if (item.nextElementSibling.className.includes('tet')) continue;
        //     elmFN(item).then((c) => {
        //       handleButton(item, 'auto', c, 'tdTweet');
        //     });
        //   }
        // }
      };
      trigDelay(twtFN);
    } catch (ex) {
      err(ex);
    }
  },
  twitlonger() {
    const content = qs('p#posttext').innerText;
    const source = qs('.actions.text-right');
    const twtFN = () => {
      if (source && !qs('.tet')) {
        handleButton(source, 'auto', content, 'prepend');
      }
    };
    trigDelay(twtFN);
  },
  twitter(elem) {
    const twtFN = () => {
      if (typeof elem === 'string') {
        for (const e of qsA(elem)) {
          const lang = elem.lang || elem.lng;
          if (elem.dataset.testid === 'tweetText' && isEmpty(lang)) continue;
          if (lang === 'zxx') continue;
          if (lang === 'qme') continue;
          if (lang === cfg.lang) continue;
          const tweetContainer = e;
          if (e.nextElementSibling) {
            if (
              e.nextElementSibling.className.includes('css-901oao') &&
              !e.nextElementSibling.nextElementSibling
            ) {
              const c = elmFN(tweetContainer);
              !tweetContainer.lang || tweetContainer.lang === ''
                ? handleButton(tweetContainer.parentElement, 'auto', c)
                : handleButton(tweetContainer.parentElement, tweetContainer.lang, c);
            }
            if (e.nextElementSibling.className.includes('tet')) {
              const c = elmFN(tweetContainer);
              !tweetContainer.lang || tweetContainer.lang === ''
                ? handleButton(tweetContainer.parentElement, 'auto', c)
                : handleButton(tweetContainer.parentElement, tweetContainer.lang, c);
            }
          }
        }
        return;
      }
      const c = elmFN(elem);
      const lang = elem.lang || elem.lng;
      if (lang === 'zxx') return;
      if (lang === 'qme') return;
      if (lang === cfg.lang) return;
      handleButton(elem.parentElement, lang, c, 'append', {
        style:
          dom.attr(elem.parentElement, 'role') === 'presentation'
            ? `color: ${getComputedStyle(elem).getPropertyValue('color')};`
            : ''
      });
    };
    trigDelay(twtFN);
  },
  async inject() {
    info('Site:', lh);
    if (find.tweetdeck) {
      const onDOMChanged = (addedNodes) => {
        if (isBlank(addedNodes)) {
          return;
        }
        for (const node of addedNodes) {
          for (const elem of qsA('p.prf-bio', node)) {
            const twtFN = () => {
              if (elem && !elem.nextElementSibling.className.includes('tet')) {
                handleButton(elem, 'auto', elem.innerText, 'tdBio');
              }
            };
            trigDelay(twtFN);
          }
          for (const elem of qsA('div.tweet-detail', node)) {
            this.tweetdeck(elem);
          }
          for (const elem of qsA('div.message-detail', node)) {
            this.tweetdeck(elem);
          }
        }
      };
      obi(null, onDOMChanged);
    } else if (find.twitter) {
      const onDOMChanged = (addedNodes) => {
        if (isBlank(addedNodes)) {
          return;
        }
        for (const node of addedNodes) {
          if (node.matches('.r-1pi2tsx.r-13qz1uu')) {
            if (
              /logout|login|signin|signout|profile|keyboard_shortcuts|display|video|photo|compose/.test(
                location.pathname
              )
            ) {
              info('Hiding menu');
              dom.attr(tetMenuButton, 'style', 'z-index: -1 !important;');
            }
          }
          for (const elem of qsA('div.r-nsbfu8 > .r-1s2bzr4 > div.css-901oao', node)) {
            if (dom.cl.has(elem, 'tetInj')) continue;
            if (elem.parentElement.contains(qs('.tet'))) continue;
            dom.cl.add(elem, 'tetInj')
            const hoverFN = () => {
              handleButton(elem.lastElementChild, 'auto', elmFN(elem, false), 'after');
            };
            delay(250).then(() => {
              trigDelay(hoverFN);
            });
          }
          if (cfg.bios) {
            for (const elem of qsA('div[data-testid="UserDescription"]', node)) {
              this.twitter(elem);
            }
          }
        }
        const tweets = addedNodes.filter((node) => !isEmpty(node.getAttribute('data-testid')));
        if (isBlank(tweets)) {
          return;
        }
        for (const node of tweets) {
          for (const elem of qsA('div[data-testid="tweetText"]', node)) {
            this.twitter(elem);
          }
        }
        tweets.length = 0;
      };
      obi(null, onDOMChanged);
    } else if (find.twitlonger) {
      await query('[id="postcontent"]');
      this.twitlonger();
    }
    const nitterObserver = () => {
      let preElement = '';
      const bioFN = () => {
        if (!qs('.profile-bio').contains(qs('.tet'))) {
          const c = elmFN(qs('div.profile-bio > p'));
          handleButton(qs('div.profile-bio > p').parentElement, 'auto', c);
        }
      };
      observe(doc.body, (mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (cfg.bios) {
              for (const elm of qsA('div.profile-bio > p', node)) {
                if (elm.innerText === preElement) continue;
                preElement = elm.innerText;
                trigDelay(bioFN);
                break;
              }
            }
            if (cfg.tweets) {
              qsA('div.tweet-body', node).forEach(() => delay(250).then(() => this.nitter()));
            }
          }
        }
      });
      this.nitter();
    };
    if (!isBlank(cfg.nitterInstances)) {
      dbg('Finding Nitter instance...', cfg.nitterInstances);
      for (const key of cfg.nitterInstances) {
        const instance = key.url.slice(8);
        if (lh === instance) {
          nitterObserver();
          break;
        }
      }
    } else if (find.nitter) nitterObserver();
  }
};
//#endregion

async function Menu() {
  try {
    // doc.body.appendChild(btNav); doc.body.appendChild(tetMenuButton);
    const selLG = qs('select#languages');
    const selCS = qs('select#colorselect');
    const selTH = qs('select#theme');
    const selTR = qs('select#translator');
    const selDS = qs('select#display');
    const selDI = qs('select#delayInject');
    const libre = qsA('input.libre');
    const lingva = qs('input.lingva');
    const dlAPI = qs('input.deepl');
    const goAPI = qs('input.google');
    const selAPI = qs('select#api-version');
    const autoColor = async () => {
      if (find.twitter) {
        if (find.logout) {
          return 'rgb(29, 155, 240)';
        } else {
          const sb = await query('a[href="/compose/tweet"]');
          const bgColor = getComputedStyle(sb).getPropertyValue('background-color');
          return bgColor == 'rgb(29, 155, 240)'
            ? 'tet-29u'
            : bgColor == 'rgb(255, 212, 0)'
            ? 'tet-255u'
            : bgColor == 'rgb(249, 24, 128)'
            ? 'tet-249u'
            : bgColor == 'rgb(120, 86, 255)'
            ? 'tet-120u'
            : bgColor == 'rgb(255, 122, 0)'
            ? 'tet-122u'
            : bgColor == 'rgb(0, 186, 124)'
            ? 'tet-186u'
            : bgColor;
        }
      } else if (find.tweetdeck) {
        cHover = 'r-hoverTD';
        cColor = 'Button--primary';
        cSub = 'tet-td';
        return 'tweetdeck';
      } else if (find.twitlonger) {
        return 'tet-29u';
      }
      cHover = 'tetNitterHover';
      cColor = 'tetNitter';
      cSub = 'tetNText';
      return 'nitter';
    };
    dlAPI.value = cfg.api.deepl ?? cfgDefault.api.deepl;
    libre[0].value = cfg.api.libre ?? cfgDefault.api.libre;
    libre[1].value = cfg.url.libre ?? cfgDefault.url.libre;
    lingva.value = cfg.url.lingva ?? cfgDefault.url.lingva;
    goAPI.value = cfg.api.google ?? cfgDefault.api.google;
    selAPI.value = cfg.api.version;
    selLG.value = cfg.lang ?? 'en';
    let v = lng[selLG.value ?? cfg.lang ?? 'en'];
    selCS.value = /auto/.test(cfg.colors) ? 'auto' : cfg.colors;
    if (selCS.value === '') selCS.value = 'auto';
    selTH.value = /auto/.test(cfg.theme) ? 'auto' : cfg.theme;
    selTR.value = cfg.translator;
    selDS.value = cfg.display;
    selDI.value = cfg.delay;
    qs('input#debug').checked = cfg.debug;
    qs('input#dmsg').checked = cfg.dms;
    qs('input#tetbio').checked = cfg.bios;
    qs('input#tetctw').checked = cfg.tweets;
    qs('input#sitetheme').checked = cfg.sitetheme;
    qs('.tet-url').value = cfg.url[selTR.value];
    const TETLanguageChange = (m) => {
      v = lng[m] ?? v;
      tetMenuButton.setAttribute('title', v.menu);
      tetMenuButton.children[1].innerText = v.menu;
      qs('select#languages').previousElementSibling.children[0].innerText = v.lg;
      qs('select#translator').previousElementSibling.children[0].innerText = v.tr;
      qs('select#display').previousElementSibling.children[0].innerText = v.ds;
      qs('select#theme').previousElementSibling.children[0].innerText = v.th;
      qs('select#colorselect').previousElementSibling.children[0].innerText = v.col;
      qs('option[value="twdef"]').innerText = v.df;
      qs('option[value="twdim"]').innerText = v.di;
      qs('option[value="twlo"]').innerText = v.lo;
      for (const o of qsA('option[value="auto"]')) {
        o.innerText = v.ao;
      }
      qs('option[value="tet-29u"]').innerText = v.cb;
      qs('option[value="tet-255u"]').innerText = v.cy;
      qs('option[value="tet-249u"]').innerText = v.cr;
      qs('option[value="tet-120u"]').innerText = v.cp;
      qs('option[value="tet-122u"]').innerText = v.co;
      qs('option[value="tet-186u"]').innerText = v.cg;
      qs('option[value="text + icon"]').innerText = v.ti;
      qs('option[value="text"]').innerText = v.t;
      qs('option[value="icon"]').innerText = v.i;
      qs('#tetReset').innerText = v.res;
      qs('h1.tetConfirmTxt > span').innerText = v.quest.head;
      qs('div.tetConfirmTxt > span').innerText = v.quest.body;
      qs('.tet-confirm').innerText = v.quest.yes;
      qs('.tet-deny').innerText = v.quest.no;
      qs('#delayInject > option[value="none"]').innerText = `0ms (${v.df})`;
      configDisplay();
    };
    const demoUpdate = (txt) => (qs('.tet-demotext').innerText = txt);
    const translatorSwap = (elem) => {
      for (const i of qsA('.tetFields')) {
        if (dom.cl.has(i, elem)) {
          dom.attr(i, 'style', 'display: inline;');
        } else {
          dom.attr(i, 'style', 'display: none;');
        }
      }
    };
    const TETMenuUpdate = (cSel, type) => {
      if (type === 'theme') {
        cTheme = '';
        cText = '';
        cBG = '';
        cSel == 'twdef'
          ? ((cTheme = 'r-14lw9ot'), (cBG = 'rgba(0, 0, 0, 0.4)'), (cText = 'r-18jsvk2'))
          : cSel == 'twdim'
          ? ((cTheme = 'r-yfoy6g'), (cBG = 'rgba(91, 112, 131, 0.4)'), (cText = 'r-jwli3a'))
          : cSel == 'nitter'
          ? ((cTheme = 'nitter'), (cBG = 'rgba(0, 0, 0, 0.4)'), (cText = 'tetNTextColor'))
          : cSel == 'btd'
          ? ((cTheme = 'r-tetBTD'), (cBG = 'rgba(0, 0, 0, 0.4)'), (cText = 'r-jwli3a'))
          : cSel == 'tweetdeck'
          ? ((cTheme = 'r-tetTD'), (cBG = 'rgba(0, 0, 0, 0.4)'), (cText = 'r-jwli3a'))
          : ((cTheme = 'r-kemksi'), (cBG = 'rgba(91, 112, 131, 0.4)'), (cText = 'r-jwli3a'));
        return;
      } else if (type === 'colors') {
        cHover = '';
        cColor = '';
        cSub = '';
        return cSel == 'tet-29u'
        ? ((cHover = 'r-1q3imqu'), (cColor = 'r-p1n3y5 r-1bih22f'), (cSub = 'r-13gxpu9'))
        : cSel == 'nitter'
        ? ((cHover = 'tetNitterHover'), (cColor = 'tetNitter'), (cSub = 'tetNText'))
        : cSel == 'btd'
        ? ((cHover = 'r-hoverTD'), (cColor = 'Button--primary'), (cSub = 'tet-btd'))
        : cSel == 'tweetdeck'
        ? ((cHover = 'r-hoverTD'), (cColor = 'Button--primary'), (cSub = 'tet-td'))
        : cSel == 'tet-255u'
        ? ((cHover = 'r-1kplyi6'), (cColor = 'r-v6khid r-cdj8wb'), (cSub = 'r-61mi1v'))
        : cSel == 'tet-249u'
        ? ((cHover = 'r-1ucxkr8'), (cColor = 'r-1iofnty r-jd07pc'), (cSub = 'r-daml9f'))
        : cSel == 'tet-120u'
        ? ((cHover = 'r-njt2r9'), (cColor = 'r-hy56xe r-11mmphe'), (cSub = 'r-xfsgu1'))
        : cSel == 'tet-122u'
        ? ((cHover = 'tet-122hu'), (cColor = 'r-1xl5njo r-b8m25f'), (cSub = 'r-1qkqhnw'))
        : cSel == 'tet-186u'
        ? ((cHover = 'r-zx61xx'), (cColor = 'r-5ctkeg r-1cqwhho'), (cSub = 'r-nw8l94'))
        : ((cHover = 'r-1q3imqu'), (cColor = 'r-p1n3y5 r-1bih22f'), (cSub = 'r-13gxpu9'));
      } else if (type == 'translator') {
        qs('.tet-url').setAttribute('style', 'display: inline;');
        return cSel == 'bingIT'
        ? translatorSwap('bing')
        : cSel == 'googleIT'
        ? translatorSwap('google')
        : cSel == 'deeplIT'
        ? translatorSwap('deepl')
        : cSel == 'translateIT'
        ? (translatorSwap('translate'),
          qs('.tet-url').setAttribute('style', 'display: none;'))
        : cSel == 'yandexIT'
        ? (translatorSwap('yandex'), qs('.tet-url').setAttribute('style', 'display: none;'))
        : cSel == 'libre'
        ? (translatorSwap('libre'), qs('.tet-url').setAttribute('style', 'display: none;'))
        : cSel == 'lingva' || cSel == 'lingvaIT'
        ? (translatorSwap('lingva'), qs('.tet-url').setAttribute('style', 'display: none;'))
        : translatorSwap('all');
      }
    };
    const autoTheme = (elem) => {
      const getTheme = () => {
        if (find.twitter) {
          const bgColor = getComputedStyle(doc.body).getPropertyValue('background-color');
          return bgColor.includes('rgb(255, 255, 255)')
            ? 'twdef'
            : bgColor.includes('rgb(21, 32, 43)')
            ? 'twdim'
            : bgColor.includes('rgb(0, 0, 0)')
            ? 'twlo'
            : bgColor;
        } else if (find.tweetdeck) {
          cBG = 'rgba(0, 0, 0, 0.4)';
          cText = 'r-jwli3a';
          cHover = 'r-hoverTD';
          cColor = 'Button--primary';
          cSub = 'tet-td';
          cTheme = 'r-tetTD';
          return 'tweetdeck';
        } else if (find.twitlonger) {
          cTheme = 'r-14lw9ot';
          cBG = 'rgba(0, 0, 0, 0.4)';
          cText = 'r-18jsvk2';
          return 'twdef';
        }
        cBG = 'rgba(0, 0, 0, 0.4)';
        cTheme = 'nitter';
        cText = 'tetNTextColor';
        return 'nitter';
      }
      const aTheme = /auto/.test(elem.value) ? getTheme() : elem.value;
      TETMenuUpdate(aTheme, 'theme');
      return getTheme();
    };
    const tetAdmin = () => {
      if (domURL.search.match(/tetopen/gi)) {
        dom.cl.remove(
          [nav, qs('[id="tetForm"]'), qs('.tet-icon-container'), qs('.tetadvanced-icon-container')],
          'rm'
        );
        dom.attr(btNav, 'style', 'z-index: 10000 !important');
        dom.cl.toggle(tetMenuButton, 'mini');
        dom.cl.add(dom.html, 'tetFreeze');
      }
    };
    if (!isBlank(domURL.search)) tetAdmin();
    //#region Nitter/TweetDeck/Twitlonger
    if (find.twitter) {
      ael(win, 'popstate', () => {
        dom.attr(tetMenuButton, 'style', '');

        dom.cl.remove('.tetBackground', cTheme);
        dom.cl.remove('.tetTextColor', cText);
        autoTheme(selTH);
        dom.cl.add('.tetBackground', cTheme);
        dom.cl.add('.tetTextColor', cText);
      });
      dom.cl.remove('.tetst', 'rm');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      dom.attr(
        p,
        'd',
        'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'
      );
      g.append(p);
      dom.attr(svg, 'viewBox', '0 0 24 24');
      dom.cl.add(svg, 'tetSub');
      svg.append(g);
      qs('.tetAvatarFrame').parentElement.append(svg);
    } else {
      if (cfg.nitterInstances.length > 0) {
        dbg('Finding Nitter instance...', cfg.nitterInstances);
        dom.cl.add(qs('.tetmsg'), 'rm');
        for (const key of cfg.nitterInstances) {
          const instance = key.url.slice(8);
          if (lh === instance) {
            dom.attr(btNav, 'id', 'tetNT');
            query('link[rel="icon"]').then((l) => {
              qs(
                '.tetAvatarFrame'
              ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
            });
            break;
          }
        }
      } else if (find.nitter) {
        dom.cl.add(qs('.tetmsg'), 'rm');
        dom.attr(btNav, 'id', 'tetNT');
        query('link[rel="icon"]').then((l) => {
          qs(
            '.tetAvatarFrame'
          ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      }
      if (find.twitlonger) {
        dom.cl.add('.tet-ac', 'rm');
        query('link[rel="shortcut icon"]').then((l) => {
          qs(
            '.tetAvatarFrame'
          ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      }
      if (find.tweetdeck) {
        dom.cl.add('.tet-ac', 'rm');
        dom.cl.add(tetMenuButton, 'tetTD');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        dom.attr(
          p,
          'd',
          'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
        );
        g.append(p);
        dom.attr(svg, 'viewBox', '0 0 24 24');
        dom.cl.add(svg, 'tetSub');
        svg.append(g);
        qs('.tetAvatarFrame').parentElement.append(svg);

        // query('link[rel="shortcut icon"]').then((l) => {
        //   qs(
        //     '.tetAvatarFrame'
        //   ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        // });
      }
      if (cfg.sitetheme) {
        if (find.tweetdeck) {
          dom.attr(btNav, 'id', 'tetBTD');
          query('body.btd-loaded').then(() => loadCSS(nitterCSS, 'nitter'));
        } else {
          loadCSS(nitterCSS, 'nitter');
        }
      }
    }
    //#endregion
    dom.attr(nav, 'style', `background-color:${cBG}`);
    TETMenuUpdate(selTR.value, 'translator');
    dom.cl.remove('.tetBackground', [autoTheme(selTH), cTheme]);
    dom.cl.add('.tetBackground', cTheme);
    dom.cl.remove('.tetTextColor', cText);
    dom.cl.add('.tetTextColor', cText);
    autoColor().then((color) => {
      cfg.colors = (/auto/.test(selCS.value) ? color : selCS.value).trim();
      TETMenuUpdate(cfg.colors, 'colors');
      dom.cl.remove('.tetDisplayColor', [color, cfg.colors]);
      dom.cl.add('.tetDisplayColor', cfg.colors);
      dom.cl.remove('.tetSub', cSub);
      dom.cl.add('.tetSub', cSub);
      cfg.colors = /auto/.test(selCS.value) ? 'auto' : selCS.value;
    });
    if (qs('.tet')) {
      dom.cl.remove('.tet', cSub);
      dom.cl.add('.tet', cSub);
    }
    ael(nav, 'click', (e) => {
      dom.cl.add(
        [
          e.target,
          tetConfirm,
          qs('[id="tetadvanced"]'),
          qs('.tet-help-container'),
          qs('[id="tetForm"]'),
          qs('.tet-icon-container'),
          qs('.tetadvanced-icon-container')
        ],
        'rm'
      );
      dom.cl.remove(dom.html, 'tetFreeze');
      dom.attr(btNav, 'style', 'z-index: -1 !important;');
      dom.attr(menuSvg, 'style', 'display: inline;');
      if (!dom.cl.has(tetMenuButton, 'mobile')) {
        dom.attr(tetMenuButton, 'style', '');
        dom.cl.add(tetMenuButton, 'mini');
      }
      dom.cl.remove(e.target, 'warn');
      selLG.value !== 'en' ?? dLng !== 'en'
        ? demoUpdate("Hey look I'm a foreign language.")
        : demoUpdate(defaultDesc);
      cfg.api.google = goAPI.value;
      cfg.api.deepl = dlAPI.value;
      cfg.api.libre = libre[0].value;
      cfg.api.yandex = qs('input[type="password"].yandex').value;
      cfg.url.libre = libre[1].value;
      cfg.url.lingva = lingva.value;
      cfg.url[selTR.value] = qs('.tet-url').value;
      cfg.colors = selCS.value;
      cfg.theme = selTH.value;
      save();
      delay(5000).then(() => dom.attr(menuSvg, 'style', 'display: none;'));
    });
    mouseEvents('div#tetSelector', (e) => {
      halt(e);
      const sColors = cColor.split(' ');
      const sSubs = cSub.split(' ');
      for (const i of sColors) {
        if (e.target.classList.contains(i)) {
          dom.cl.remove(e.target, i);
        } else {
          dom.cl.add(e.target, i);
        }
      }
      for (const i of sSubs) {
        if (e.target.children[0].classList.contains(i)) {
          dom.cl.remove(e.target.children[0], i);
        } else {
          dom.cl.add(e.target.children[0], i);
        }
      }
    });
    ael(selTH, 'change', (e) => {
      dom.cl.remove('.tetDisplayColor', cfg.colors);
      dom.cl.remove('.tetBackground', cTheme);
      dom.cl.remove('.tetTextColor', cText);
      autoTheme(e.target);
      dom.cl.add('.tetDisplayColor', cfg.colors);
      dom.cl.add('.tetBackground', cTheme);
      dom.cl.add('.tetTextColor', cText);
    });
    ael(selCS, 'change', (e) => {
      const cSel = e.target.value;
      dom.cl.remove('.tetDisplayColor', [cfg.colors, selCS.value]);
      dom.cl.remove('.tetSub', cSub);
      if (qs('.tet')) dom.cl.remove('.tet', cSub);
      autoColor().then((color) => {
        cfg.colors = /auto/.test(cSel) ? color : cSel;
        TETMenuUpdate(cfg.colors, 'colors');
        dom.cl.add('.tetDisplayColor', cfg.colors);
        dom.cl.add('.tetSub', cSub);
        if (qs('.tet')) dom.cl.add('.tet', cSub);
        cfg.colors = /auto/.test(cSel) ? 'auto' : cSel;
      });
    });
    ael(selLG, 'change', (e) => {
      cfg.lang = e.target.value;
      langChange(e.target.value);
      TETLanguageChange(e.target.value);
    });
    ael(selTR, 'change', (e) => {
      const cSel = e.target.value;
      cfg.translator = cSel;
      if (cSel === 'deeplIT') {
        qs('.tet-url').value = `https://${
          selAPI.value == 'api-pro' ? 'api' : 'api-free'
        }.deepl.com`;
      } else {
        qs('.tet-url').value = cfg.url[cSel];
      }
      TETMenuUpdate(cSel, 'translator');
      configDisplay();
    });
    ael(selDS, 'change', (e) => {
      cfg.display = e.target.value;
      configDisplay();
    });
    ael(selAPI, 'change', (e) => {
      cfg.api.google = goAPI.value;
      cfg.api.deepl = dlAPI.value;
      cfg.api.libre = libre[0].value;
      cfg.api.yandex = qs('input[type="password"].yandex').value;
      cfg.url.libre = libre[1].value;
      cfg.url.lingva = lingva.value;
      cfg.api.version = e.target.value;
      if (selTR.value === 'deeplIT') {
        qs('.tet-url').value = `https://${
          e.target.value == 'api-pro' ? 'api' : 'api-free'
        }.deepl.com`;
      } else {
        qs('.tet-url').value = cfg.url[selTR.value];
      }
    });
    ael(selDI, 'change', (e) => (cfg.delay = e.target.value));
    ael(qs('input#debug'), 'change', (e) => (cfg.debug = e.target.checked));
    ael(qs('input#dmsg'), 'change', (e) => (cfg.dms = e.target.checked));
    ael(qs('input#tetbi'), 'change', (e) => (cfg.bios = e.target.checked));
    ael(qs('input#tetctw'), 'change', (e) => (cfg.tweets = e.target.checked));
    ael(qs('input#sitetheme'), 'change', (e) => (cfg.sitetheme = e.target.checked));
    ael(qs('[id="tetReset"]'), 'click', () => {
      dom.cl.remove(tetConfirm, 'rm');
      dom.cl.add(nav, 'warn');
    });
    ael(qs('.tetConfirmBtns.confirm'), 'click', () => {
      cfg = cfgDefault;
      save();
      delay(250).then(() => location.reload());
    });
    ael(qs('.tetConfirmBtns.deny'), 'click', () => {
      dom.cl.add(tetConfirm, 'rm');
      dom.cl.remove(nav, 'warn');
    });
    ael(qs('.tet-icon-info'), 'click', () => {
      dom.cl.add('[id="tetadvanced"]', 'rm');
      dom.cl.toggle('.tet-help-container', 'rm');
    });
    ael(qs('[id="tetNI"]'), 'click', async (e) => {
      const pretxt = e.target.innerHTML;
      e.target.innerHTML = `[TET] ${lng[cfg.lang].l}...`;
      const str = await TET.fetchURL(nitterURL, 'GET', 'text');
      const reg =
        /\[[\w.]+\]\((https?:\/\/.+)\)\s+\|\s:white_check_mark:\s\|\s:white_check_mark:\s\|/g;
      const lines = str
        .split('\n')
        .filter((line) =>
          /\[[\w.]+\]\(https?:\/\/.+\)\s+\|\s:white_check_mark:\s\|\s:white_check_mark:\s\|/g.test(
            line
          )
        )
        .map((line) => {
          const raw = reg.exec(line);
          if (isEmpty(raw)) {
            return '';
          }
          return raw[1];
        })
        .filter((line) => !isEmpty(line));
      console.groupCollapsed(
        '[%cTET%c] %cINF',
        'color: rgb(29, 155, 240);',
        '',
        'color: rgb(255, 108, 96);',
        'Nitter Instances'
      );
      for (const line of lines) {
        log(`// @match        ${line}`);
      }
      console.groupEnd();
      e.target.innerHTML = 'Open browsers dev tools to view list';
      delay(5000).then(() => {
        e.target.innerHTML = pretxt;
      });
    });
    TETLanguageChange();
    delay(5000).then(() => dom.attr(menuSvg, 'style', 'display: none;'));
    info('Menu injection complete');
  } catch (ex) {
    err(ex);
  }
}
//#region Initialize Userscript
const configSetup = () => {
  try {
    // Remove legacy config storage
    if (isGM) {
      if (!isNull(localStorage.getItem('cfg'))) {
        localStorage.removeItem('cfg');
      }
      if (!isNull(localStorage.getItem('TETConfig'))) {
        localStorage.removeItem('TETConfig');
      }
    }

    cfg = TET.getValue('Config', cfgDefault);
    for (const key in cfgDefault) {
      if (!hasOwn(cfg, key)) {
        cfg[key] = cfgDefault[key];
      } else if (key === 'api') {
        for (const key2 in cfgDefault[key]) {
          if (!hasOwn(cfg[key], key2)) {
            cfg[key][key2] = cfgDefault[key][key2];
          }
        }
      } else if (key === 'url') {
        for (const key2 in cfgDefault[key]) {
          if (!hasOwn(cfg[key], key2)) {
            cfg[key][key2] = cfgDefault[key][key2];
          }
        }
      }
    }
    if (/tetdebug/gi.test(domURL.search)) {
      cfg.debug = true;
      save();
    }
    if (/tetrestore/gi.test(domURL.search)) {
      cfg = cfgDefault;
      save();
    }

    // info('Presetup complete + config loaded');
    log('Config:', cfg);
    lngFN();
    langChange();
    info('Starting Menu injection');
    if (isMobile) {
      tetMenuButton.classList.add('mobile');
      btNav.classList.add('mobile');
    }
    doc.body.append(btNav, tetMenuButton);
    Menu();
    info('Starting content script injection');
    site.inject();
  } catch (ex) {
    err(ex);
  }
};
const onDomReady = () => {
  if (isNull(dom.body)) {
    dom.root = document.querySelector(':root');
    dom.html = document.documentElement;
    dom.head = document.head;
    dom.body = document.body;
    dom.search = document || dom.root || dom.html || dom.head || dom.body;
  }
  loadCSS(tetCSS, 'core');
  configSetup();
};
//#endregion

//#region Console Logs
function dbg(...msg) {
  if (!cfg.debug) return;
  console.debug(
    '[%cTET%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    ...msg
  );
}
/** Error handling for UserScript */
function err(...msg) {
  console.error(
    '[%cTET%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
}
/** Information handling for userscript */
function info(...msg) {
  if (!cfg.debug) return;
  console.info(
    '[%cTET%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
}
function log(...msg) {
  if (!cfg.debug) return;
  console.log(
    '[%cTET%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    ...msg
  );
}
//#endregion

try {
  if (typeof userjs === 'object' && userjs.UserJS && topDOM) {
    if (find.twitter) {
      if (location.pathname === '/' && find.logout) throw new Error('Must be login, canceling...');
      if (find.remover) throw new Error('On blacklisted page, canceling...');
    }
    if (find.tweetdeck && find.logout) throw new Error('Must be login, canceling...');
    tetForm.append(tetHeader, tetMain);
    tetMenuButton.append(menuSvg, menuSpan);
    btNav.append(nav, tetConfirm, tetForm, tetAdv, tetAdvC, tetAdvI);
    iconData.fn();

    const readyState = doc.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      onDomReady();
    } else {
      ael(doc, 'DOMContentLoaded', onDomReady, { once: true });
    }
  }
} catch (ex) {
  err(ex);
}
