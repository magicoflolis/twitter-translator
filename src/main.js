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

const win = self ?? window;
const doc = win.document;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const NOOPFUNC = () => {};
const UA = navigator.userAgent;
const domURL = new URL(location);
// const isMobile = /Mobi/.test(UA);
const isMobile = /Mobile|Tablet/.test(UA);
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
/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
const qsA = (element, root) => {
  try {
    root = root || document;
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
    root = root || document;
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
  root = root || document;
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
const normalizeTarget = (target) => {
  if (typeof target === 'string') {
    return Array.from(qsA(target));
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
    root = root || document || document.documentElement;
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
    el = document.createElement(element);
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
 * Create/Make/Update Cookie
 * @param {string} name - Create cookie w/ this name
 * @param {string} value - Cookie value
 * @param {Object} options - (Optional) Additional options // Converts {key: value} => key=value
 * @returns {string} Returns value of created/made/updated Cookie
 */
const makeCookie = async (name, value, options = {}) => {
  try {
    Object.assign(options, {
      path: '/'
    });
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (const key in options) {
      updatedCookie += `; ${key}`;
      const optionValue = options[key];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
    dbg('[makeCookie] New cookie value:', updatedCookie);
    return updatedCookie;
  } catch (ex) {
    return err(ex);
  }
};
const controller = new AbortController();
const signal = controller.signal;
const TET = {
  /**
   * Get resource text
   * @param {string} name - Name of the resource to retrieve
   * @returns {string} Text resource with fallback to itself
   * @link https://violentmonkey.github.io/api/gm/#gm_getresourcetext
   */
  getResourceText(name) {
    if (isGM) {
      return GM_getResourceText(name);
    }
    return name;
  },
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
  info() {
    return isGM
      ? GM_info
      : {
          script: {
            updateURL: '',
            version: 'Bookmarklet'
          }
        };
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
  async setClipboard(txt, type = 'text/plain') {
    try {
      return new Promise((resolve, reject) => {
        return navigator.clipboard.writeText(txt).then(resolve, reject);
      });
    } catch (ex) {
      err(`[Clipboard] Failed to copy: ${ex}`);
      if (isGM) {
        return Promise.resolve(GM_setClipboard(txt, type));
      }
    }
  },
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
      // include, *same-origin, omit
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

//#region Config
let checkSupport = typeof GM !== 'undefined';
let TM = {
  getResourceText:
    typeof GM_getResourceText !== 'undefined' ? GM_getResourceText : GM.getResourceText,
  getValue: typeof GM_getValue !== 'undefined' ? GM_getValue : GM.getValue,
  info: typeof GM_info !== 'undefined' ? GM_info : GM.info,
  openInTab: typeof GM_openInTab !== 'undefined' ? GM_openInTab : GM.openInTab,
  setValue: typeof GM_setValue !== 'undefined' ? GM_setValue : GM.setValue,
  xmlhttpRequest: typeof GM_xmlhttpRequest !== 'undefined' ? GM_xmlhttpRequest : GM.xmlhttpRequest
};
let tetInfo = {
  icon: TM.info.script.icon,
  name: TM.info.script.name,
  version: TM.info.script.version,
  namespace: TM.info.script.namespace
};
let dLng = 'en';
const openPage = (url, params = { active: true, insert: true }) => {
  if (checkSupport) {
    return TM.openInTab(url, params);
  } else {
    return win.open(url, '_blank');
  }
};
/** element, mouseenterFn, mouseleaveFn */
const mouseEvents = (elms, enter, leave) => {
  leave = leave ?? enter;
  if (typeof elms === 'string') {
    query(elms).then((elements) => {
      for (const e of elements) {
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
const lh = doc.location.host;
const find = {
  logout: !getCookie('twid'),
  nitter:
    /nitter|nittr|nttr|twitr|bird|hyper/.test(lh) ||
    lh === 'twitter.076.ne.jp' ||
    lh === 'twitter.censors.us',
  twitter: lh === 'twitter.com' || lh === 'mobile.twitter.com',
  tweetdeck: lh === 'tweetdeck.twitter.com',
  twitlonger: /twitlonger/.test(lh),
  remover: /begin_password_reset|account|logout|login|signin|signout/.test(doc.location.pathname)
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
const toDataURL = (src) => fetchURL(src, 'GET', 'blob');
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
  azure: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/azure.ico`,
  bing: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/bing.svg`,
  deepl: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/deepl.png`,
  gCloud: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/googlecloud.ico`,
  google: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/google.ico`,
  libre: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/libre.ico`,
  lingva: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/lingva.png`,
  mymemory: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/mymemory.png`,
  translate: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/translate.svg`,
  yandex: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/yandex.ico`,
  async fn() {
    return {
      azure: `<img class="tet-favicon" src="${await toDataURL(this.azure)}"/>`,
      bing: `<img class="tet-favicon" src="${await toDataURL(this.bing)}"/>`,
      deepl: `<img class="tet-favicon" src="${await toDataURL(this.deepl)}"/>`,
      gCloud: `<img class="tet-favicon" src="${await toDataURL(this.gCloud)}"/>`,
      google: `<img class="tet-favicon" src="${await toDataURL(this.google)}"/>`,
      libre: `<img class="tet-favicon" src="${await toDataURL(this.libre)}"/>`,
      lingva: `<img class="tet-favicon" src="${await toDataURL(this.lingva)}"/>`,
      mymemory: `<img class="tet-favicon" src="${await toDataURL(this.mymemory)}"/>`,
      translate: `<img class="tet-favicon" src="${await toDataURL(this.translate)}"/>`,
      yandex: `<img class="tet-favicon" src="${await toDataURL(this.yandex)}"/>`
    };
  }
};
let TETConfig = {},
  iconCache = {},
  lng = {},
  cBG = 'rgba(91, 112, 131, 0.4)',
  cColor = 'r-p1n3y5 r-1bih22f',
  cHover = 'r-1q3imqu',
  cText = 'r-jwli3a',
  cTheme = 'r-kemksi',
  cSub = 'r-13gxpu9',
  tet = {
    defaultcfg: {
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
    },
    /** Waits until `args` return true */
    async check(args) {
      while (args) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return args;
    },
    halt(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    /**
     * Will inject CSS into the head of the document.
     * @param {string} css - The CSS to inject
     * @param {string} name - Each CSS starts with the following IDs: #tet-${common/foreign/etc}
     */
    loadCSS(css, name) {
      name = name ?? 'common';
      let s = make('style', null, {
        id: `tet-${name}`,
        innerHTML: css
      });
      (doc.head || doc.documentElement || doc).appendChild(s);
    },
    /** Log handling for userscript */
    log(...msg) {
      if (!TETConfig['debug']) return;
      console.log(
        '[%cTET%c] %cDBG',
        'color: rgb(29, 155, 240);',
        '',
        'color: rgb(255, 212, 0);',
        ...msg
      );
    },
    /**
     * @param {Node} element
     * @param {MutationCallback} callback
     * @param {MutationObserverInit} options
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      let observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    },
    /**
     * Waits until querySelector(`element`) exists
     * @source {@link https://stackoverflow.com/a/53269990/9872174}
     */
    async query(selector, root) {
      root = root ?? doc;
      while (root.querySelector(selector) === null) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return root.querySelector(selector);
    },
    /** Saves config to localStorage + UserJS storage */
    save() {
      try {
        TM.setValue('Config', JSON.stringify(TETConfig));
        localStorage.setItem('TETConfig', JSON.stringify(TETConfig));
      } catch (e) {
        err(e);
      }
    }
  },
  fetchURL = (url, method = 'GET', responseType = 'json', params = {}) => {
    return new Promise((resolve, reject) => {
      if (checkSupport) {
        TM.xmlhttpRequest({
          method: method,
          url,
          responseType,
          ...params,
          onprogress: (p) => info(`Progress: ${p.loaded} / ${p.total}`),
          onerror: (e) => reject(e),
          onload: (r) => {
            if (r.status !== 200) reject(`${r.status} ${url}`);
            if (responseType === 'blob') {
              let reader = new FileReader();
              reader.readAsDataURL(r.response);
              reader.onloadend = () => {
                resolve(reader.result);
              };
            } else {
              resolve(r.response);
            }
          }
        });
      } else {
        fetch(url, {
          method: method,
          ...params
        }).then((response) => {
          if (!response.ok) reject(response);
          if (responseType.includes('json')) {
            resolve(response.json());
          } else if (responseType.includes('text')) {
            resolve(response.text());
          } else if (responseType.includes('blob')) {
            resolve(response.blob());
          }
          resolve(response);
        });
      }
    });
  },
  menu = `<div class="navbackground rm"></div>
<div class="tetConfirmation tetBackground rm">
  <h1 class="tetAlertTxt tetTextColor"><span>${languages.en.quest.head}</span></h1>
  <div class="tetAlertTxt tetTextColor"><span>${languages.en.quest.body}</span></div>
  <div class="tetAlertBtns confirm tetBtn" style="background-color: rgb(239, 243, 244);" data-testid="confirmationSheetConfirm">
    <div style="color: rgb(15, 20, 25);"><span><span class="tet-confirm">${
      languages.en.quest.yes
    }</span></span></div>
  </div>
  <div class="tetAlertBtns deny tetDisplayColor tetBtn" data-testid="confirmationSheetCancel">
    <div style="color: rgb(239, 243, 244);"><span><span class="tet-deny">${
      languages.en.quest.no
    }</span></span></div>
  </div>
</div>
<div id="tetForm" class="tetBackground rm">
  <div class="tet-header tetTextColor">
    <span class="tet-info-name">${tetInfo.name} Settings</span>
    <span class="tetTextColor tet-info">v${tetInfo.version}</span>
  </div>
  <div class="tet-main">
  <div class="r-demo tetBackground">
  <div class="tet-av">
    <div class="tetAvatarFrame">
    </div>
  </div>
  <div class="tet-txt">
    <div class="txt-header">
      <div class="tet-at tetTextColor"><span>${
        tetInfo.name
      }</span><span class="tetTextColor">@for_lollipops</span></div>
    </div>
    <div class="tetTextColor tet-dc"><span class="tet-demotext">${
      !checkSupport ? 'ERROR Unable to resolve GM_ or GM. objects' : defaultDesc
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
<div id="tetReset" class="tetDisplayColor tetBtn">Defaults</div>
  </div>
</div>
<div id="tetadvanced" class="rm">
  <div class="tetBackground">
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
  </div>
</div>
<div class="rm tetadvanced-icon-container">
  <svg viewBox="0 0 24 24" class="tetadvanced-icon tetTextColor"><g><path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path><path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path></g></svg>
</div>
<div class="rm tet-icon-container">
  <a class="tet-icon-info tetDisplayColor" title="Help">?</a>
  <div class="rm tetBackground tet-help-container">
    <a class="tet-help-info tetTextColor" href="${
      tetInfo.namespace
    }" target="_blank">Visit GitHub ⤴</a>
  </div>
</div>`,
  tetMenuButton = make('div', 'mini tetDisplayColor tetBtn', {
    id: 'tetMenuButton',
    title: languages.en.menu,
    innerHTML: `<svg viewBox="0 0 24 24" id="tetSVG" class="tetTextColor" width="15"><g><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm8.472 9.442c-.242.19-.472.368-.63.486-.68-1.265-1.002-1.78-1.256-2.007-.163-.145-.37-.223-.78-.375-.367-.136-1.482-.55-1.65-.85-.087-.153.136-.602.23-.793.088-.177.164-.33.196-.497.123-.646-.33-1.146-.728-1.59-.066-.072-.153-.17-.23-.26.335-.12.862-.26 1.42-.384 1.95 1.448 3.26 3.704 3.428 6.272zm-9.788-7.83c.076.25.145.5.182.678-.255.15-.663.363-.96.52-.262.136-.522.273-.738.392-.247.137-.442.234-.6.313-.347.174-.598.3-.833.553-.068.073-.26.278-1.02 1.886l-1.79-.656c1.293-1.94 3.362-3.31 5.76-3.685zM12 20.5c-4.687 0-8.5-3.813-8.5-8.5 0-1.197.25-2.335.7-3.37.47.182 1.713.66 2.75 1.035-.107.336-.245.854-.26 1.333-.03.855.502 1.7.562 1.792.053.08.12.15.2.207.303.21.687.5.827.616.063.343.166 1.26.23 1.833.144 1.266.175 1.48.24 1.65.005.012.514 1.188 1.315 1.188.576-.003.673-.206 1.855-2.688.244-.512.45-.95.513-1.058.1-.144.597-.61.87-.83.55-.442.76-1.82.413-2.682-.335-.83-1.92-2.08-2.5-2.195-.17-.033-.43-.04-.953-.053-.497-.01-1.25-.028-1.536-.09-.098-.024-.314-.094-.605-.196.32-.668.627-1.28.71-1.4.05-.052.168-.112.408-.234.17-.086.383-.192.653-.34.208-.116.458-.247.71-.38 1.168-.612 1.484-.8 1.658-1.082.11-.177.263-.44-.04-1.544 1.042.027 2.038.24 2.955.61-.89.32-1.024.595-1.106.77-.367.784.256 1.475.667 1.93.096.107.24.268.32.38l-.017.036c-.234.472-.67 1.35-.196 2.194.406.72 1.384 1.13 2.437 1.52.134.05.25.092.33.126.16.208.496.79 1 1.735l.154.285c.078.14.33.505.842.505.167 0 .363-.04.59-.137.032-.013.083-.035.18-.094C19.72 17.405 16.22 20.5 12 20.5zm-3.812-9.45c.01-.285.102-.646.184-.907l.027.006c.397.09 1.037.11 1.83.13.32.006.59.008.615 0 .326.143 1.355 1 1.483 1.31.113.28.05.812-.034 1.01-.233.197-.845.735-1.085 1.078-.093.13-.212.373-.64 1.274-.133.276-.313.654-.488 1.013-.026-.225-.054-.472-.08-.686-.225-2.003-.273-2.22-.42-2.445-.05-.078-.202-.31-1.135-.973-.117-.213-.268-.564-.26-.813z"></path></g></svg><span>${languages.en.menu}</span>`
  }),
  btNav = make('div', 'btNav', {
    id: 'tetTW',
    role: 'dialog',
    style: 'z-index: -1 !important;',
    innerHTML: menu
  }),
  content = '',
  // Couldn't figure out how to make my own
  // invalid_chars from https://greasyfork.org/scripts/423001
  invalid_chars = {
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
  },
  elmFN = (sel) => {
    try {
      return new Promise((resolve) => {
        let txtFilter =
          sel.textContent.match(/[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}\p{Po}\p{So}\p{Sc}\d]/gu) ||
          [];
        content = '';
        for (const key of txtFilter) {
          content += key.replace(/[\\/|<>*?:#"]/g, (v) => invalid_chars[v]);
        }
        resolve(encodeURIComponent(content));
      });
    } catch (error) {
      err(error);
    }
  },
  langChange = (lchange) => {
    info('Updating language');
    let cfglng = TETConfig['lang'] ?? 'en';
    if (lchange) {
      lng = {};
      cfglng = lchange ?? cfglng;
    }
    for (const key in languages) {
      if (key !== cfglng) continue;
      if (!Object.prototype.hasOwnProperty.call(lng, key)) {
        lng[key] = languages[key];
      } else if (key === 'quest') {
        for (const key3 in languages[key]) {
          if (!Object.prototype.hasOwnProperty.call(lng[key], key3)) {
            lng[key][key3] = languages[key][key3];
          }
        }
      }
    }
    lng[cfglng]['ti'] = `${lng[cfglng]['t']} + ${lng[cfglng]['i']}`;
    tet.log('Language:', lng);
  };
//#endregion
//#region Site n Menu Fn
async function configDisplay() {
  let v = iconCache;
  return new Promise((resolve) => {
    let dis = TETConfig['display'],
      tra = TETConfig['translator'];
    if (!dis) throw new Error(`TETConfig["display"] is undefined ${dis}`);
    if (dis === 'text + icon') {
      tra.match(/lingva/gi)
        ? resolve(`Lingva Translate ${v.lingva}`)
        : tra.match(/libre/gi)
        ? resolve(`LibreTranslate ${v.libre}`)
        : tra == 'bingIT'
        ? resolve(`Azure Cognitive Services ${v.azure}`)
        : tra == 'bing'
        ? resolve(`Bing ${v.bing}`)
        : tra == 'googleIT'
        ? resolve(`Google Cloud ${v.gCloud}`)
        : tra == 'google'
        ? resolve(`Google ${v.google}`)
        : tra.match(/mymemory/gi)
        ? resolve(`MyMemory ${v.mymemory}`)
        : tra.match(/translate/gi)
        ? resolve(`Translate.com ${v.translate}`)
        : tra.match(/yandex/gi)
        ? resolve(`Yandex ${v.yandex}`)
        : resolve(`DeepL ${v.deepl}`);
    } else if (dis === 'icon') {
      tra.match(/lingva/gi)
        ? resolve(v.lingva)
        : tra.match(/libre/gi)
        ? resolve(v.libre)
        : tra == 'bingIT'
        ? resolve(v.azure)
        : tra == 'bing'
        ? resolve(v.bing)
        : tra == 'googleIT'
        ? resolve(v.gCloud)
        : tra == 'google'
        ? resolve(v.google)
        : tra.match(/mymemory/gi)
        ? resolve(v.mymemory)
        : tra.match(/translate/gi)
        ? resolve(v.translate)
        : tra.match(/yandex/gi)
        ? resolve(v.yandex)
        : resolve(v.deepl);
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
      let tw = lng[TETConfig['lang'] ?? 'en'].tw;
      qs('#tetDemo').innerHTML = `${tw} ${display}`;
      if (!qs('.tet')) return;
      for (const t of qsA('.tet')) {
        t.innerHTML = `${tw} ${display}`;
      }
    })
    .catch((e) => err(e.message));
}
/** Src Element, Src Language, Src Content, Inject Mode */
function handleButton(source, src, content, mode) {
  mode = mode ?? 'append';
  src = src ?? 'auto';
  let ntStyle = 'margin: 0px 0px 0px 58px !important; padding: .75em;',
    tetBtn = make('div', `tet ${cSub}`),
    btnDiv = make('div', `tetTextColor ${cText}`, {
      id: 'tweet-text'
    }),
    btnSpan = make('span');
  btnDiv.append(btnSpan);
  ael(tetBtn, 'mouseenter', (e) => e.target.classList.add('r-hover'));
  ael(tetBtn, 'mouseleave', (e) => e.target.classList.remove('r-hover'));
  ael(tetBtn, 'click', (e) => {
    tet.halt(e);
    let pretxt = e.target.innerHTML,
      tr = TETConfig['translator'],
      findTR = () => {
        return new Promise((resolve) => {
          if (tr.match(/IT|libre/gi)) {
            if (e.target.parentElement.contains(btnDiv)) {
              btnDiv.classList.toggle('rm');
              resolve('Already exists');
            } else {
              e.target.innerHTML = `[TET] ${lng[TETConfig['lang']].l}...`;
              if (tr.match(/lingva/gi)) {
                resolve(
                  fetchURL(
                    `${TETConfig['url']['lingva']}/api/v1/${src}/${TETConfig['lang']}/${content}`
                  )
                );
              } else if (tr.match(/libre/gi)) {
                resolve(
                  fetchURL(TETConfig['url']['libre'], 'POST', {
                    body: JSON.stringify({
                      q: content,
                      source: src,
                      target: TETConfig['lang'],
                      format: 'text',
                      api_key: TETConfig['api']['libre']
                    })
                  })
                );
              } else if (tr.match(/bing/gi)) {
                throw new Error('Work in progress');
              } else if (tr.match(/google/gi)) {
                resolve(
                  fetchURL(
                    `${TETConfig['url'][tr]}/language/translate/v2?q=${content}&target=${TETConfig['lang']}&source=${src}&key=${TETConfig.api.google}`
                  )
                );
              } else if (tr.match(/mymemory/gi)) {
                resolve(
                  fetchURL(
                    `${TETConfig['url'][tr]}/get?q=${content}&langpair=${src}|${TETConfig['lang']}`
                  )
                );
              } else if (tr.match(/translate/gi)) {
                resolve(
                  fetchURL('https://api.translate.com/translate/v1/login', 'POST', {
                    body: JSON.stringify({
                      email: src,
                      password: TETConfig['lang']
                    })
                  }).then(() => {
                    fetchURL(TETConfig['url'][tr], 'POST', {
                      body: JSON.stringify({
                        text: content,
                        source_language: src,
                        translation_language: TETConfig['lang']
                      })
                    });
                  })
                );
              } else if (tr.match(/yandex/gi)) {
                resolve(
                  fetchURL(TETConfig['url'][tr], 'POST', {
                    body: JSON.stringify({
                      sourceLanguageCode: src,
                      targetLanguageCode: TETConfig['lang'],
                      format: 'string',
                      texts: [content],
                      folderId: TETConfig['api']['yandex']
                    })
                  })
                );
              } else if (tr.match(/deepl/gi)) {
                resolve(
                  fetchURL(
                    `https://${
                      TETConfig['api']['version'].match(/pro/gi) ? 'api' : 'api-free'
                    }.deepl.com/v2/translate?auth_key=${
                      TETConfig.api.deepl
                    }&text=${content}&target_lang=${TETConfig['lang']}`
                  )
                );
              } else {
                throw new Error('Unable to locate selected translator');
              }
            }
          } else {
            if (tr.match(/lingva/gi)) {
              resolve(`${TETConfig['url'][tr]}/${src}/${TETConfig['lang']}/${content}`);
            } else if (tr.match(/bing/gi)) {
              resolve(
                `${TETConfig['url'][tr]}/translator/?text=${content}&from=${src}&to=${TETConfig['lang']}`
              );
            } else if (tr.match(/google/gi)) {
              resolve(`${TETConfig['url'][tr]}/?q=${content}&sl=${src}&tl=${TETConfig['lang']}`);
            } else if (tr.match(/mymemory/gi)) {
              resolve(
                `${TETConfig['url'][tr]}/${TETConfig['lang']}/${src}/${TETConfig['lang']}/${content}`
              );
            } else if (tr.match(/translate/gi)) {
              resolve(
                `${TETConfig['url'][tr]}/machine-translation#${src}/${TETConfig['lang']}/${content}`
              );
            } else if (tr.match(/yandex/gi)) {
              resolve(`${TETConfig['url'][tr]}/?lang=${src}-${TETConfig['lang']}&text=${content}`);
            } else if (tr.match(/deepl/gi)) {
              resolve(`${TETConfig['url'][tr]}/translator#${src}/${TETConfig['lang']}/${content}`);
            } else {
              throw new Error('Unable to locate selected translator');
            }
          }
        });
      };
    findTR()
      .then((r) => {
        let find = () => {
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
        // tet.log(r);
        if (typeof r === 'string') {
          if (r.match(/Already exists/gi)) return;
          e.target.innerHTML = pretxt;
          openPage(r);
        } else {
          btnSpan.innerHTML = find();
          if (!e.target.parentElement.contains(btnDiv)) {
            e.target.innerHTML = pretxt;
            e.target.after(btnDiv);
          }
        }
      })
      .catch((error) => {
        err(error.message);
        btnSpan.innerHTML += `---> ${error}`;
        if (!e.target.parentElement.contains(btnDiv)) e.target.after(btnDiv);
      });
  });
  mode === 'append'
    ? source.append(tetBtn)
    : mode === 'after'
    ? source.after(tetBtn)
    : mode === 'afterend'
    ? source.insertAdjacentHTML('afterend', tetBtn)
    : mode === 'before'
    ? source.before(tetBtn)
    : mode === 'prepend'
    ? source.prepend(tetBtn)
    : mode === 'tdTweet'
    ? source.after(tetBtn)
    : mode === 'tdBio'
    ? source.after(tetBtn)
    : mode === 'nitter'
    ? (source.after(tetBtn),
      tetBtn.setAttribute('style', ntStyle),
      btnDiv.setAttribute('style', ntStyle))
    : mode.prepend(tetBtn);
  configDisplay();
}
//#endregion

//#region Sites
const site = {
  nitter() {
    let twtFN = () => {
      for (const tc of qsA('.tweet-content')) {
        if (
          !tc.parentElement.parentElement.nextElementSibling ||
          !tc.parentElement.parentElement.nextElementSibling.className.includes('tet')
        ) {
          elmFN(tc).then((c) => handleButton(tc.parentElement.parentElement, 'auto', c, 'nitter'));
        }
      }
    };
    TETConfig['delay'] !== 'none' ? delay(TETConfig['delay']).then(() => twtFN()) : twtFN();
  },
  tweetdeck() {
    try {
      let twtFN = () => {
        for (const item of qsA('p.js-tweet-text')) {
          if (item.lang) {
            if (
              item.lang.includes(languages[TETConfig['lang'] ?? 'en']) &&
              !item.nextElementSibling
            )
              continue;
            if (!item.nextElementSibling) continue;
            if (!item.nextElementSibling.className.includes('js-translate-call-to-action'))
              continue;
            if (!item.nextElementSibling.nextElementSibling) continue;
            if (item.nextElementSibling.nextElementSibling.className.includes('tet')) continue;
            elmFN(item).then((c) => {
              handleButton(item.nextElementSibling, item.lang, c, 'tdTweet');
            });
          } else {
            if (!item.nextElementSibling) continue;
            if (item.nextElementSibling.className.includes('tet')) continue;
            elmFN(item).then((c) => {
              handleButton(item, 'auto', c, 'tdTweet');
            });
          }
        }
      };
      TETConfig['delay'] !== 'none' ? delay(TETConfig['delay']).then(() => twtFN()) : twtFN();
    } catch (e) {
      err(e);
    }
  },
  twitlonger() {
    let content = qs('p#posttext').innerText,
      source = qs('.actions.text-right'),
      twtFN = () => {
        if (source && !qs('.tet')) {
          handleButton(source, 'auto', content, 'prepend');
        }
      };
    TETConfig['delay'] !== 'none' ? delay(TETConfig['delay']).then(() => twtFN()) : twtFN();
  },
  twitter(elem) {
    let twtFN = () => {
      if (typeof elem === 'string') {
        for (const e of qsA(elem)) {
          let tweetContainer = e;
          if (e.nextElementSibling) {
            if (
              e.nextElementSibling.className.includes('css-901oao') &&
              !e.nextElementSibling.nextElementSibling
            ) {
              elmFN(tweetContainer).then((c) => {
                !tweetContainer.lang || tweetContainer.lang === ''
                  ? handleButton(tweetContainer.parentElement, 'auto', c)
                  : handleButton(tweetContainer.parentElement, tweetContainer.lang, c);
              });
            }
            if (e.nextElementSibling.className.includes('tet')) {
              elmFN(tweetContainer).then((c) => {
                !tweetContainer.lang || tweetContainer.lang === ''
                  ? handleButton(tweetContainer.parentElement, 'auto', c)
                  : handleButton(tweetContainer.parentElement, tweetContainer.lang, c);
              });
            }
          }
        }
      } else {
        elmFN(elem).then((c) => {
          !elem.lang || elem.lang === ''
            ? handleButton(elem.parentElement, 'auto', c)
            : handleButton(elem.parentElement, elem.lang, c);
        });
      }
    };
    TETConfig['delay'] !== 'none' ? delay(TETConfig['delay']).then(() => twtFN()) : twtFN();
  },
  async inject() {
    info('Site:', lh);
    if (find.tweetdeck) {
      await tet.query('section.js-column > div');
      tet.observe(qs('.js-modals-container'), (mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (TETConfig['bios']) {
              for (const elem of node.querySelectorAll('p[class*="prf-bio"]')) {
                let twtFN = () => {
                  if (elem && !elem.nextElementSibling.className.includes('tet')) {
                    handleButton(elem, 'auto', elem.innerText, 'tdBio');
                  }
                };
                TETConfig['delay'] !== 'none'
                  ? delay(TETConfig['delay']).then(() => twtFN())
                  : twtFN();
                break;
              }
            }
          }
        }
      });
      let preElem = qs('.application').className;
      tet.observe(qs('.application'), (mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            for (const elem of node.querySelectorAll('div[class*="tweet-detail"]')) {
              if (elem.className === preElem) continue;
              preElem = elem.className;
              delay(250).then(() => this.tweetdeck());
              break;
            }
            // eslint-disable-next-line no-unused-vars
            for (const msg of node.querySelectorAll('div[class*="message-detail"]')) {
              delay(250).then(() => this.tweetdeck());
            }
          }
        }
      });
    }
    if (find.twitter) {
      win.addEventListener('popstate', () => {
        qs('#tetMenuButton').setAttribute('style', '');
      });
      await tet.query('#react-root > div > div');
      await tet.query('main');
      let preElement = '',
        preBio = '',
        prePath = doc.location.pathname,
        loTwitter = (elem) => {
          let twtFN = () => {
            elmFN(elem).then((c) => {
              !elem.lang || elem.lang === ''
                ? handleButton(elem.parentElement, 'auto', c)
                : handleButton(elem.parentElement, elem.lang, c);
            });
          };
          TETConfig.delay !== 'none' ? delay(TETConfig.delay).then(() => twtFN()) : twtFN();
        };
      tet.observe(doc.body, (mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (TETConfig['bios']) {
              for (const elem of node.querySelectorAll('div[data-testid="UserDescription"]')) {
                if (elem.innerText === preBio) continue;
                preBio = elem.innerText;
                if (find.logout) {
                  loTwitter(elem);
                } else {
                  delay(250).then(() => {
                    this.twitter('div[data-testid="UserDescription"]');
                  });
                }
                break;
              }
            }
            for (const elem of node.querySelectorAll('div[data-testid="tweetText"]')) {
              if (elem.innerText === preElement) continue;
              preElement = elem.innerText;
              let ecss = getComputedStyle(elem.parentElement),
                elh = ecss.alignSelf;
              if (elh === 'flex-start' && TETConfig['dms']) {
                loTwitter(elem);
              } else if (find.logout) {
                loTwitter(elem);
              } else if (elem.lang) {
                delay(250).then(() => {
                  this.twitter('div[data-testid="tweetText"]');
                });
              }
              break;
            }
            for (const elem of node.querySelectorAll(
              'div.r-nsbfu8 > .r-1s2bzr4 > div.css-901oao'
            )) {
              if (elem.classList.contains('tetInj')) continue;
              if (elem.parentElement.contains(qs('.tet'))) continue;
              elem.classList.add('tetInj');
              let hoverFN = () => {
                elmFN(elem).then(() => {
                  handleButton(elem.lastElementChild, 'auto', content, 'after');
                });
              };
              delay(250).then(() => {
                TETConfig['delay'] !== 'none'
                  ? delay(TETConfig['delay']).then(() => hoverFN())
                  : hoverFN();
              });
            }
            let curPath = doc.location.pathname;
            if (curPath === prePath) continue;
            prePath = curPath;
            if (
              /logout|login|signin|signout|profile|keyboard_shortcuts|display|video|photo|compose/.test(
                doc.location.pathname
              )
            ) {
              info('Hiding menu');
              qs('#tetMenuButton').setAttribute('style', 'z-index: -1 !important;');
            }
          }
        }
      });
    }
    if (find.twitlonger) {
      await tet.query('#postcontent');
      this.twitlonger();
    }
    let nitterObserver = () => {
      let preElement = '',
        bioFN = () => {
          if (!qs('.profile-bio').contains(qs('.tet'))) {
            elmFN(qs('div.profile-bio > p')).then((c) =>
              handleButton(qs('div.profile-bio > p').parentElement, 'auto', c)
            );
          }
        };
      tet.observe(doc.body, (mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (TETConfig['bios']) {
              for (const elm of qsA('div.profile-bio > p', node)) {
                if (elm.innerText === preElement) continue;
                preElement = elm.innerText;
                TETConfig['delay'] !== 'none'
                  ? delay(TETConfig['delay']).then(() => bioFN())
                  : bioFN();
                break;
              }
            }
            if (TETConfig['tweets']) {
              node
                .querySelectorAll('div.tweet-body')
                .forEach(() => delay(250).then(() => this.nitter()));
            }
          }
        }
      });
      this.nitter();
    };
    if (TETConfig['nitterInstances'].length > 0) {
      tet.log('Finding Nitter instance...', TETConfig['nitterInstances']);
      for (const key of TETConfig['nitterInstances']) {
        let instance = key.url.slice(8);
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
    if (isMobile) {
      tetMenuButton.classList.add('mobile');
      btNav.classList.add('mobile');
    }
    document.body.appendChild(btNav);
    document.body.appendChild(tetMenuButton);
    let nav = qs('.navbackground'),
      tetAlert = qs('.tetConfirmation'),
      selLG = qs('select#languages'),
      selCS = qs('select#colorselect'),
      selTH = qs('select#theme'),
      selTR = qs('select#translator'),
      selDS = qs('select#display'),
      selDI = qs('select#delayInject'),
      libre = qsA('input.libre'),
      lingva = qs('input.lingva'),
      dlAPI = qs('input.deepl'),
      goAPI = qs('input.google'),
      selAPI = qs('select#api-version'),
      autoTheme = async () => {
        return await new Promise((resolve) => {
          if (find.twitter) {
            tet.query('body').then((sb) => {
              let bgColor = getComputedStyle(sb).getPropertyValue('background-color');
              bgColor.includes('rgb(255, 255, 255)')
                ? resolve('twdef')
                : bgColor.includes('rgb(21, 32, 43)')
                ? resolve('twdim')
                : bgColor.includes('rgb(0, 0, 0)')
                ? resolve('twlo')
                : resolve(bgColor);
            });
          } else if (find.tweetdeck) {
            cBG = 'rgba(0, 0, 0, 0.4)';
            cText = 'r-jwli3a';
            cHover = 'r-hoverTD';
            cColor = 'Button--primary';
            cSub = 'tet-td';
            cTheme = 'r-tetTD';
            resolve('tweetdeck');
          } else if (find.twitlonger) {
            (cTheme = 'r-14lw9ot'), (cBG = 'rgba(0, 0, 0, 0.4)'), (cText = 'r-18jsvk2');
            resolve('twdef');
          } else {
            cBG = 'rgba(0, 0, 0, 0.4)';
            cTheme = 'nitter';
            cText = 'tetNTextColor';
            resolve('nitter');
          }
        });
      },
      autoColor = async () => {
        return await new Promise((resolve) => {
          if (find.twitter) {
            if (find.logout) {
              resolve('rgb(29, 155, 240)');
            } else {
              tet.query('a[href="/compose/tweet"]').then((sb) => {
                let bgColor = getComputedStyle(sb).getPropertyValue('background-color');
                bgColor == 'rgb(29, 155, 240)'
                  ? resolve('tet-29u')
                  : bgColor == 'rgb(255, 212, 0)'
                  ? resolve('tet-255u')
                  : bgColor == 'rgb(249, 24, 128)'
                  ? resolve('tet-249u')
                  : bgColor == 'rgb(120, 86, 255)'
                  ? resolve('tet-120u')
                  : bgColor == 'rgb(255, 122, 0)'
                  ? resolve('tet-122u')
                  : bgColor == 'rgb(0, 186, 124)'
                  ? resolve('tet-186u')
                  : resolve(bgColor);
              });
            }
          } else if (find.tweetdeck) {
            cHover = 'r-hoverTD';
            cColor = 'Button--primary';
            cSub = 'tet-td';
            resolve('tweetdeck');
          } else if (find.twitlonger) {
            resolve('tet-29u');
          } else {
            cHover = 'tetNitterHover';
            cColor = 'tetNitter';
            cSub = 'tetNText';
            resolve('nitter');
          }
        });
      };
    dlAPI.value = TETConfig['api']['deepl'] ?? tet['defaultcfg']['api']['deepl'];
    libre[0].value = TETConfig['api']['libre'] ?? tet['defaultcfg']['api']['libre'];
    libre[1].value = TETConfig['url']['libre'] ?? tet['defaultcfg']['url']['libre'];
    lingva.value = TETConfig['url']['lingva'] ?? tet['defaultcfg']['lingva'];
    goAPI.value = TETConfig['api']['google'] ?? tet['defaultcfg']['api']['google'];
    selAPI.value = TETConfig['api']['version'];
    selLG.value = TETConfig['lang'] ?? 'en';
    let v = lng[selLG.value ?? TETConfig['lang'] ?? 'en'],
      s = doc.location.search;
    selCS.value = /auto/.test(TETConfig['colors']) ? 'auto' : TETConfig['colors'];
    if (selCS.value === '') selCS.value = 'auto';
    selTH.value = /auto/.test(TETConfig['theme']) ? 'auto' : TETConfig['theme'];
    selTR.value = TETConfig['translator'];
    selDS.value = TETConfig['display'];
    selDI.value = TETConfig['delay'];
    qs('input#debug').checked = TETConfig['debug'];
    qs('input#dmsg').checked = TETConfig['dms'];
    qs('input#tetbio').checked = TETConfig['bios'];
    qs('input#tetctw').checked = TETConfig['tweets'];
    qs('input#sitetheme').checked = TETConfig['sitetheme'];
    qs('.tet-url').value = TETConfig['url'][selTR.value];
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
        qs('h1.tetAlertTxt > span').innerText = v.quest.head;
        qs('div.tetAlertTxt > span').innerText = v.quest.body;
        qs('.tet-confirm').innerText = v.quest.yes;
        qs('.tet-deny').innerText = v.quest.no;
        qs('#delayInject > option[value="none"]').innerText = `0ms (${v.df})`;
        configDisplay();
      },
      demoUpdate = (txt) => (qs('.tet-demotext').innerText = txt),
      translatorSwap = (element) => {
        for (const i of qsA('.tetFields')) {
          if (i.classList.contains(element)) {
            i.setAttribute('style', 'display: inline;');
          } else {
            i.setAttribute('style', 'display: none;');
          }
        }
      },
      TETMenuUpdate = async (cSel, type) => {
        return await new Promise((resolve) => {
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
            resolve();
          } else if (type === 'colors') {
            cHover = '';
            cColor = '';
            cSub = '';
            resolve(
              cSel == 'tet-29u'
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
                : ((cHover = 'r-1q3imqu'), (cColor = 'r-p1n3y5 r-1bih22f'), (cSub = 'r-13gxpu9'))
            );
          } else if (type == 'translator') {
            qs('.tet-url').setAttribute('style', 'display: inline;');
            resolve(
              cSel == 'bingIT'
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
                : translatorSwap('all')
            );
          }
        });
      },
      tetAdmin = () => {
        tet.log(s);
        if (s.match(/tetopen/gi)) {
          nav.classList.remove('rm');
          qs('#tetForm').classList.remove('rm');
          qs('.tet-icon-container').classList.remove('rm');
          qs('.tetadvanced-icon-container').classList.remove('rm');
          btNav.setAttribute('style', 'z-index: 10000 !important');
          tetMenuButton.classList.toggle('mini');
          document.documentElement.classList.add('tetFreeze');
        }
      };
    if (s) tetAdmin();
    //#region Nitter/TweetDeck/Twitlonger
    if (find.twitter) {
      qs('.tetst').classList.add('rm');
      let link = 'https://abs.twimg.com/favicons/twitter.ico';
      qs(
        '.tetAvatarFrame'
      ).innerHTML = `<div id="tetAvatar" style="background-image: url(${link}) !important;"></div>`;
    } else {
      if (TETConfig['nitterInstances'].length > 0) {
        tet.log('Finding Nitter instance...', TETConfig['nitterInstances']);
        qs('.tetmsg').classList.add('rm');
        for (const key of TETConfig['nitterInstances']) {
          let instance = key.url.slice(8);
          if (lh === instance) {
            btNav.setAttribute('id', 'tetNT');
            tet.query('link[rel="icon"]').then((l) => {
              qs(
                '.tetAvatarFrame'
              ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
            });
            break;
          }
        }
      } else if (find.nitter) {
        qs('.tetmsg').classList.add('rm');
        btNav.setAttribute('id', 'tetNT');
        tet.query('link[rel="icon"]').then((l) => {
          qs(
            '.tetAvatarFrame'
          ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      }
      if (find.twitlonger) {
        for (const cfg of qsA('.tet-ac')) {
          cfg.classList.add('rm');
        }
        tet.query('link[rel="shortcut icon"]').then((l) => {
          qs(
            '.tetAvatarFrame'
          ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      }
      if (find.tweetdeck) {
        for (const cfg of qsA('.tet-ac')) {
          cfg.classList.add('rm');
        }
        tetMenuButton.classList.add('tetTD');
        tet.query('link[rel="shortcut icon"]').then((l) => {
          qs(
            '.tetAvatarFrame'
          ).innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      }
      if (TETConfig['sitetheme']) {
        if (find.tweetdeck) {
          btNav.setAttribute('id', 'tetBTD');
          tet.query('body.btd-loaded').then(() => tet.loadCSS(nitterCSS, 'nitter'));
        } else {
          tet.loadCSS(nitterCSS, 'nitter');
        }
      }
    }
    //#endregion
    nav.setAttribute('style', `background-color:${cBG}`);
    TETMenuUpdate(selTR.value, 'translator');
    autoTheme().then((theme) => {
      let aTheme = /auto/.test(selTH.value) ? theme : selTH.value;
      TETMenuUpdate(aTheme, 'theme').then(() => {
        for (const i of qsA('.tetBackground')) {
          i.classList.remove(theme);
          i.classList.remove(cTheme);
          i.classList.add(cTheme);
        }
        for (const i of qsA('.tetTextColor')) {
          i.classList.remove(cText);
          i.classList.add(cText);
        }
      });
    });
    autoColor().then((color) => {
      TETConfig['colors'] = /auto/.test(selCS.value) ? color : selCS.value;
      TETMenuUpdate(TETConfig['colors'], 'colors').then(() => {
        tet.query('.tetDisplayColor').then(() => {
          for (const i of qsA('.tetDisplayColor')) {
            i.classList.remove(color);
            i.classList.remove(TETConfig['colors']);
            i.classList.add(TETConfig['colors']);
          }
          for (const i of qsA('.tetSub')) {
            i.classList.remove(cSub);
            i.classList.add(cSub);
          }
          TETConfig['colors'] = /auto/.test(selCS.value) ? 'auto' : selCS.value;
        });
      });
    });
    if (qs('.tet')) {
      for (const i of qsA('.tet')) {
        i.classList.remove(cSub);
        i.classList.add(cSub);
      }
    }
    ael(nav, 'click', (e) => {
      !tetAlert.classList.contains('rm') ? tetAlert.classList.add('rm') : false;
      !qs('#tetadvanced').classList.contains('rm') ? qs('#tetadvanced').classList.add('rm') : false;
      document.documentElement.classList.remove('tetFreeze');
      qs('.tet-help-container').classList.add('rm');
      qs('#tetForm').classList.add('rm');
      qs('.tet-icon-container').classList.add('rm');
      qs('.tetadvanced-icon-container').classList.add('rm');
      btNav.setAttribute('style', 'z-index: -1 !important;');
      qs('svg#tetSVG').setAttribute('style', 'display: inline;');
      if (!tetMenuButton.classList.contains('mobile')) {
        tetMenuButton.setAttribute('style', '');
        tetMenuButton.classList.add('mini');
      }
      e.target.classList.remove('warn');
      e.target.classList.add('rm');
      selLG.value !== 'en' ?? dLng !== 'en'
        ? demoUpdate("Hey look I'm a foreign language.")
        : demoUpdate(defaultDesc);
      TETConfig['api']['google'] = goAPI.value;
      TETConfig['api']['deepl'] = dlAPI.value;
      TETConfig['api']['libre'] = libre[0].value;
      TETConfig['api']['yandex'] = qs('input[type="password"].yandex').value;
      TETConfig['url']['libre'] = libre[1].value;
      TETConfig['url']['lingva'] = lingva.value;
      TETConfig['url'][selTR.value] = qs('.tet-url').value;
      TETConfig['colors'] = selCS.value;
      TETConfig['theme'] = selTH.value;
      tet.save();
      delay(5000).then(() => qs('svg#tetSVG').setAttribute('style', 'display: none;'));
    });
    ael(tetMenuButton, 'click', (e) => {
      nav.classList.remove('rm');
      qs('#tetForm').classList.remove('rm');
      qs('.tet-icon-container').classList.remove('rm');
      qs('.tetadvanced-icon-container').classList.remove('rm');
      btNav.setAttribute('style', 'z-index: 10000 !important');
      e.target.classList.toggle('mini');
      document.documentElement.classList.add('tetFreeze');
    });
    mouseEvents('div#tetSelector', (e) => {
      tet.halt(e);
      let sColors = cColor.match(/[A-Za-z0-9_.]+-[A-Za-z0-9_.]+/gi) ?? [cColor],
        sSubs = cSub.match(/[A-Za-z0-9_.]+-[A-Za-z0-9_.]+/gi) ?? [cSub];
      for (const i of sColors) {
        if (e.target.classList.contains(i)) {
          e.target.classList.remove(i);
        } else {
          e.target.classList.add(i);
        }
      }
      for (const i of sSubs) {
        if (e.target.children[0].classList.contains(i)) {
          e.target.children[0].classList.remove(i);
        } else {
          e.target.children[0].classList.add(i);
        }
      }
    });
    ael(tetMenuButton, 'mouseenter', (e) => {
      e.target.classList.toggle(cHover, TETConfig['colors']);
      qs('svg#tetSVG').setAttribute('style', 'display: none;');
      e.target.classList.toggle('mini');
    });
    ael(tetMenuButton, 'mouseleave', (e) => {
      e.target.classList.toggle(cHover, TETConfig['colors']);
      qs('svg#tetSVG').setAttribute('style', 'display: inline;');
      e.target.classList.toggle('mini');
      delay(5000).then(() => qs('svg#tetSVG').setAttribute('style', 'display: none;'));
    });
    ael(selTH, 'change', (e) => {
      let cSel = e.target.value;
      for (const i of qsA('.tetDisplayColor')) i.classList.remove(TETConfig['colors']);
      for (const i of qsA('.tetBackground')) i.classList.remove(cTheme);
      for (const i of qsA('.tetTextColor')) i.classList.remove(cText);
      autoTheme().then((theme) => {
        let aTheme = /auto/.test(cSel) ? theme : cSel;
        TETMenuUpdate(aTheme, 'theme').then(() => {
          for (const i of qsA('.tetBackground')) i.classList.add(cTheme);
          for (const i of qsA('.tetTextColor')) i.classList.add(cText);
          for (const i of qsA('.tetDisplayColor')) i.classList.add(TETConfig['colors']);
        });
      });
    });
    ael(selCS, 'change', (e) => {
      let cSel = e.target.value;
      for (const i of qsA('.tetDisplayColor')) {
        i.classList.remove(TETConfig['colors']);
        i.classList.remove(selCS.value);
      }
      for (const i of qsA('.tetSub')) i.classList.remove(cSub);
      if (qs('.tet')) for (const i of qsA('.tet')) i.classList.remove(cSub);
      autoColor().then((color) => {
        TETConfig['colors'] = /auto/.test(cSel) ? color : cSel;
        TETMenuUpdate(TETConfig['colors'], 'colors').then(() => {
          tet.query('.tetDisplayColor').then(() => {
            for (const i of qsA('.tetDisplayColor')) i.classList.add(TETConfig['colors']);
            for (const i of qsA('.tetSub')) i.classList.add(cSub);
            if (qs('.tet')) for (const i of qsA('.tet')) i.classList.add(cSub);
            TETConfig['colors'] = /auto/.test(cSel) ? 'auto' : cSel;
          });
        });
      });
    });
    ael(selLG, 'change', (e) => {
      TETConfig['lang'] = e.target.value;
      langChange(e.target.value);
      TETLanguageChange(e.target.value);
    });
    ael(selTR, 'change', (e) => {
      let cSel = e.target.value;
      TETConfig['translator'] = cSel;
      if (cSel === 'deeplIT') {
        qs('.tet-url').value = `https://${
          selAPI.value == 'api-pro' ? 'api' : 'api-free'
        }.deepl.com`;
      } else {
        qs('.tet-url').value = TETConfig['url'][cSel];
      }
      TETMenuUpdate(cSel, 'translator');
      configDisplay();
    });
    ael(selDS, 'change', (e) => {
      TETConfig['display'] = e.target.value;
      configDisplay();
    });
    ael(selAPI, 'change', (e) => {
      TETConfig['api']['google'] = goAPI.value;
      TETConfig['api']['deepl'] = dlAPI.value;
      TETConfig['api']['libre'] = libre[0].value;
      TETConfig['api']['yandex'] = qs('input[type="password"].yandex').value;
      TETConfig['url']['libre'] = libre[1].value;
      TETConfig['url']['lingva'] = lingva.value;
      TETConfig['api']['version'] = e.target.value;
      if (selTR.value === 'deeplIT') {
        qs('.tet-url').value = `https://${
          e.target.value == 'api-pro' ? 'api' : 'api-free'
        }.deepl.com`;
      } else {
        qs('.tet-url').value = TETConfig['url'][selTR.value];
      }
    });
    ael(selDI, 'change', (e) => (TETConfig['delay'] = e.target.value));
    ael(qs('input#debug'), 'change', (e) => (TETConfig['debug'] = e.target.checked));
    ael(qs('input#dmsg'), 'change', (e) => (TETConfig['dms'] = e.target.checked));
    ael(qs('input#tetbi'), 'change', (e) => (TETConfig['bios'] = e.target.checked));
    ael(qs('input#tetctw'), 'change', (e) => (TETConfig['tweets'] = e.target.checked));
    ael(qs('input#sitetheme'), 'change', (e) => (TETConfig['sitetheme'] = e.target.checked));
    ael(qs('#tetReset'), 'click', () => {
      tetAlert.classList.remove('rm');
      nav.classList.add('warn');
    });
    ael(qs('.tetAlertBtns.confirm'), 'click', () => {
      localStorage.removeItem('TETConfig');
      TETConfig = tet.defaultcfg;
      tet.save();
      delay(250).then(() => doc.location.reload());
    });
    ael(qs('.tetAlertBtns.deny'), 'click', () => {
      tetAlert.classList.add('rm');
      nav.classList.remove('warn');
    });
    ael(qs('.tet-icon-info'), 'click', () => {
      !qs('#tetadvanced').classList.contains('rm') ? qs('#tetadvanced').classList.add('rm') : false;
      qs('.tet-help-container').classList.toggle('rm');
    });
    ael(qs('.tetadvanced-icon-container'), 'click', () => {
      qs('.tet-help-container').classList.add('rm');
      qs('#tetadvanced').classList.toggle('rm');
    });
    ael(qs('#tetNI'), 'click', (e) => {
      let pretxt = e.target.innerHTML;
      TETConfig['nitterInstances'] = [];
      e.target.innerHTML = `[TET] ${lng[TETConfig['lang']].l}...`;
      fetchURL(`${ghCDN}/xnaas/nitter-instances/.upptimerc.yml`, 'GET', 'text').then((str) => {
        let nURL = str.match(/ url: https:\/\/[a-zA-Z0-9].+/gi);
        if (nURL) {
          for (const i of nURL) {
            for (const n of i.split('url: ')) {
              let url = n.match(/https:\/\/[a-zA-Z0-9].+/gi);
              if (!url) continue;
              TETConfig['nitterInstances'].push({ url });
            }
          }
        }
        console.groupCollapsed(
          '[%cTET%c] %cINF',
          'color: rgb(29, 155, 240);',
          '',
          'color: rgb(255, 108, 96);',
          'Nitter Instances'
        );
        for (const i of TETConfig['nitterInstances']) {
          let n = i.url;
          console.log(`// @match        ${n}`);
        }
        console.groupEnd();
        e.target.innerHTML = 'Open browsers dev tools to view list';
        tet.save();
        delay(5000).then(() => {
          e.target.innerHTML = pretxt;
        });
      });
    });
    TETLanguageChange();
    delay(5000).then(() => qs('svg#tetSVG').setAttribute('style', 'display: none;'));
    info('Menu injection complete');
  } catch (e) {
    err(e);
  }
}
//#region Initialize Userscript
//https://libretranslate.com/?source=en&target=es&q=hello
async function setupConfig() {
  let data = await Promise.all([TM.getValue('Config', JSON.stringify(tet.defaultcfg))]).catch(
    (e) => {
      err(e);
    }
  );
  tet.loadCSS(tetCSS, 'core');
  TETConfig = JSON.parse(localStorage.getItem('TETConfig') ?? data[0]);
  for (const key in tet.defaultcfg) {
    if (!Object.prototype.hasOwnProperty.call(TETConfig, key)) {
      TETConfig[key] = tet.defaultcfg[key];
    } else if (key === 'api') {
      for (const key2 in tet.defaultcfg[key]) {
        if (!Object.prototype.hasOwnProperty.call(TETConfig[key], key2)) {
          TETConfig[key][key2] = tet.defaultcfg[key][key2];
        }
      }
    } else if (key === 'url') {
      for (const key3 in tet.defaultcfg[key]) {
        if (!Object.prototype.hasOwnProperty.call(TETConfig[key], key3)) {
          TETConfig[key][key3] = tet.defaultcfg[key][key3];
        }
      }
    }
  }
  info('Presetup complete + config loaded');
  tet.log('Config:', TETConfig);
  let s = doc.location.search;
  if (s) {
    if (s.match(/tetdebug/gi)) {
      TETConfig['debug'] = true;
      tet.save();
    }
    if (s.match(/tetrestore/gi)) {
      localStorage.removeItem('TETConfig');
      TETConfig = tet.defaultcfg;
      tet.save();
    }
  }
  lngFN();
  langChange();
  info('Starting Menu injection');
  Menu();
  info('Starting content script injection');
  site.inject();
}

async function preSetup() {
  try {
    return await new Promise((resolve) => {
      if (find.twitter) {
        if (doc.location.pathname === '/' && find.logout)
          throw new Error('Must be login, canceling...');
        if (find.remover) throw new Error('In blacklisted page, canceling...');
      }
      if (find.tweetdeck && find.logout) throw new Error('Must be login, canceling...');
      iconData.fn().then((icons) => {
        iconCache = icons;
        resolve(setupConfig());
      });
    });
  } catch (e) {
    return err(e);
  }
}

function dbg(...msg) {
  console.log(
    '[%cTET%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    ...msg
  )
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
  if (!TETConfig['debug']) return;
  console.info(
    '[%cTET%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
}

preSetup();

//#endregion
