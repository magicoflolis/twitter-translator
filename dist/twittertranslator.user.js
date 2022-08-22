// ==UserScript==
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
// @description  Adds external & internal translators to various sites.
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
// @author       Magic <magicoflolis@tuta.io>
// @version      1.5.1
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @downloadURL  https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @updateURL    https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js
// @supportURL   https://github.com/magicoflolis/twitter-translator/issues/new
// @namespace    https://github.com/magicoflolis/twitter-translator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/twitter-translator#twitter-external-translator
// @license      GPL-3.0
// @connect      *
// @match        https://mobile.twitter.com/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://www.twitlonger.com/show/*
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
// @grant        document.cookie
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_info
// @grant        GM.info
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM.openInTab
// @compatible   Chrome
// @compatible   Firefox
// @noframes
// @run-at       document-body
// ==/UserScript==

// Uncompressed source code:
// https://github.com/magicoflolis/twitter-translator/src
'use strict';
(() => {
  const twCSS = `.prf-header>div>.tet{display:inline-block !important;width:100% !important}select.tetTextColor{height:auto !important}
`,
  tetCSS = `.r-1bih22f{box-shadow:rgb(29, 161, 242) 0px 0px 0px 1px}.r-1cqwhho{box-shadow:rgb(23, 191, 99) 0px 0px 0px 1px}.r-b8m25f{box-shadow:rgb(244, 93, 34) 0px 0px 0px 1px}.r-11mmphe{box-shadow:rgb(121, 75, 196) 0px 0px 0px 1px}.r-jd07pc{box-shadow:rgb(224, 36, 94) 0px 0px 0px 1px}.r-cdj8wb{box-shadow:rgb(255, 173, 31) 0px 0px 0px 1px}.tet-29u:not(.tetswitch){background-color:rgb(29, 155, 240)}.tet-186u:not(.tetswitch){background-color:rgb(0, 186, 124)}.tet-122u:not(.tetswitch){background-color:rgb(255, 122, 0)}.tet-120u:not(.tetswitch){background-color:rgb(120, 86, 255)}.tet-249u:not(.tetswitch){background-color:rgb(249, 24, 128)}.tet-255u:not(.tetswitch){background-color:rgb(255, 212, 0)}.tetswitch.tet-29u>input:checked+label{background-color:rgba(26,145,218,.384)}.tetswitch.tet-29u>input:checked+label:before{background-color:#1d9bf0}.tetswitch.tet-186u>input:checked+label{background-color:rgba(21,172,89,.384)}.tetswitch.tet-186u>input:checked+label:before{background-color:#00ba7c}.tetswitch.tet-122u>input:checked+label{background-color:rgba(220,84,31,.384)}.tetswitch.tet-122u>input:checked+label:before{background-color:#ff7a00}.tetswitch.tet-120u>input:checked+label{background-color:rgba(134,93,202,.384)}.tetswitch.tet-120u>input:checked+label:before{background-color:#7856ff}.tetswitch.tet-249u>input:checked+label{background-color:rgba(202,32,85,.384)}.tetswitch.tet-249u>input:checked+label:before{background-color:#f91880}.tetswitch.tet-255u>input:checked+label{background-color:rgba(230,156,28,.384)}.tetswitch.tet-255u>input:checked+label:before{background-color:#ffd400}.tetswitch.nitter>input:checked+label{background-color:rgba(255,108,96,.384)}.tetswitch.nitter>input:checked+label:before{background-color:#ff6c60}.tetswitch.tweetdeck>input:checked+label{background-color:rgba(29,161,242,.384)}.tetswitch.tweetdeck>input:checked+label:before{background-color:#1da1f2}#tetReset,#tetMenuButton>span{color:#fff !important}#tetSelector>select{background-color:rgba(0,0,0,0);border:rgba(0,0,0,0)}#tetSelector>select:focus{box-shadow:none !important}.navbackground.d1tet{background-color:rgba(91,112,131,.4)}.navbackground.d2tet{background-color:rgba(0,0,0,.4)}.navbackground.d3tet{background-color:rgba(91,112,131,.4)}.tet-header>span:last-child,.tet-at>span:last-child{color:#6e767d}.r-demo,.tet-help-container,#apifield,#tetSelector{border-color:rgba(0,0,0,0)}.r-demo.r-14lw9ot,.tet-help-container.r-14lw9ot,#apifield.r-14lw9ot,#tetSelector.r-14lw9ot{border-color:#536471}.r-demo.r-yfoy6g,.tet-help-container.r-yfoy6g,#apifield.r-yfoy6g,#tetSelector.r-yfoy6g{border-color:#38444d}.r-demo.nitter,.r-demo.r-tetTD,.r-demo.r-kemksi,.tet-help-container.nitter,.tet-help-container.r-tetTD,.tet-help-container.r-kemksi,#apifield.nitter,#apifield.r-tetTD,#apifield.r-kemksi,#tetSelector.nitter,#tetSelector.r-tetTD,#tetSelector.r-kemksi{border-color:#2f3336}.r-14lw9ot>div#tetName span{color:#536471}.r-kemksi>div#tetName span,.r-yfoy6g>div#tetName span{color:#6e767d}.tetBtn.nitter{border:rgba(0,0,0,0)}.Button--primary{border-color:#1da1f2;box-shadow:#1da1f2 0px 0px 0px 1px}.r-tetTD{border-radius:14px;background-color:#15202b}.r-tetTD#tetSelector.Button--primary:hover{border-color:#1da1f2;box-shadow:#1da1f2 0px 0px 0px 1px}.r-tetTD#tetSelector.Button--primary:hover #tetName span{color:#1da1f2}.r-tetTD #tetName span{color:#8899a6}.prf-header>div>.tet.tet-td{color:#fff !important}.tet-td{color:#8899a6}.tet-td#tetName{color:#1da1f2 !important}.tet-td#tetName span{color:inherit !important}.tet-border-black{border-color:#000}.r-9ilb82{color:#6e767d}.r-1kqtdi0{border-color:#2f3336}.r-p1n3y5{border-color:#1d9bf0 !important}.r-1q3imqu{background-color:#1a91da}.r-13gxpu9{color:#1d9bf0}.r-13gxpu9#tetName{color:#1d9bf0 !important}.r-13gxpu9#tetName span{color:inherit !important}.r-v6khid{border-color:#ffd400 !important}.r-61mi1v{color:#ffd400}.r-61mi1v#tetName{color:#ffd400 !important}.r-61mi1v#tetName span{color:inherit !important}.r-1kplyi6{background-color:#e69c1c}.r-1iofnty{border-color:#f91880 !important}.r-daml9f{color:#f91880}.r-daml9f#tetName{color:#f91880 !important}.r-daml9f#tetName span{color:inherit !important}.r-1ucxkr8{background-color:#ca2055}.r-njt2r9{background-color:#865dca}.r-hy56xe{border-color:#7856ff !important}.r-xfsgu1{color:#7856ff}.r-xfsgu1#tetName{color:#7856ff !important}.r-xfsgu1#tetName span{color:inherit !important}.tet-122hu{background-color:#dc541f}.r-1xl5njo{border-color:#ff7a00 !important}.r-1qkqhnw{color:#ff7a00}.r-1qkqhnw#tetName{color:#ff7a00 !important}.r-1qkqhnw#tetName span{color:inherit !important}.r-zx61xx{background-color:#15ac59}.r-5ctkeg{border-color:#00ba7c !important}.r-nw8l94{color:#00ba7c}.r-nw8l94#tetName{color:#00ba7c !important}.r-nw8l94#tetName span{color:inherit !important}.r-yfoy6g{background-color:#15202b}.r-14lw9ot{background-color:#fff}.r-kemksi{background-color:#000}.r-18jsvk2{color:#0f1419 !important}.tweetdeck:not(.tetswitch){background-color:#1da1f2;color:#fff}.tweetdeck:not(.tetswitch)#tetName{color:#1da1f2}.tweetdeck:not(.tetswitch)#tetName span{color:inherit !important}.r-demo{border-style:solid !important;border-radius:16px !important;border-width:1px !important}.r-jwli3a{color:#fff !important}.tetNitterHover{background-color:#ff6c60}.tetNitter{border-color:#ffaca0 !important;box-shadow:#ffaca0 0px 0px 0px 1px !important}.btNav:not(#tetNT) .tet-icon-info.nitter,.btNav:not(#tetNT) .tetBtn.nitter{color:#fff;background-color:#ff6c60}h1.tetNTextColor{color:#888889}.nitter:not(.tetswitch,.tetBtn){border-color:#ff6c60;background-color:#0f0f0f}.nitter:not(.tetswitch,.tetBtn) div#tetName span{color:#ff6c60}input.tetNTextColor,select.tetNTextColor,div.tetNTextColor,svg.tetNTextColor,label.tetNTextColor>span{color:#f8f8f2}.tetNText,.tetNText span{color:#ff6c60 !important}.tetNBackground{background-color:#161616}#tetNI{color:#fff}#tetAvatar{background-color:rgba(0,0,0,0)}.tet-flex,.btNav,#tetadvanced,#tetadvanced>.tetBackground,.tet-txt,.r-demo,.tet-main{position:relative;display:flex;align-items:stretch;box-sizing:border-box;flex-direction:column}.btNav,.txt-header,.tet-av,.tetAlertBtns>div{align-items:center !important}#tetName,.r-demo,#tetadvanced,.tetAlertTxt,.tet-header{cursor:default}.txt-header,.tetAlertBtns,.r-demo,.tet-av,.r-hover,#apifield{outline-style:none !important}.tet-dc,.tet-at,div.tetAlertTxt,.tet-info,.btNav label,.tetAlertBtns>div,#tetSelector>select{font-size:15px !important}.tet-at>span:first-child,h1.tetAlertTxt,.tetAlertBtns>div{font-weight:700 !important}.tet,#tetDemo,.tet-dc,.tet-at,.tethelper-info,div.tetAlertTxt,.tet-info,.tet-icon-info,#tweet-text,#tetSelector>#tetName{font-weight:400}.tet,#tetDemo,.tetswitch>label,#tetSelector>#tetName{line-height:16px}.tetAlertBtns>div>span,#tetMenuButton>svg,.txt-header,.tetadvanced-icon,.tet-at{max-width:100%}.tet-at{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tet-dc,.tet-at,.tet-header,#tetSelector>#tetName,#tetSelector>select{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}.tet,#tweet-text,.tetAlertBtns>div,.tet-main{font-family:"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}div.tetAlertTxt,.tet-info,.tet-dc,.tet-at,.tethelper-info,.tetAlertBtns>div,#tetSelector>select{line-height:20px}.tetAvatarFrame,#tetAvatar,.tet-main,.tet-containter,.tet-av,div.tetAlertTxt{width:100%}.tetAvatarFrame,#tetAvatar{align-items:stretch;border:0px solid #000;box-sizing:border-box;display:flex;flex-direction:column;margin:0px;min-height:0px;min-width:0px;padding:0px}#tetSelector{min-width:0px;overflow-wrap:break-word}#tetSelector #tetName{position:absolute;min-width:inherit;overflow-wrap:inherit}.tet,.tet-info,#tweet-text{margin-top:1% !important}#tweet-text,.tet-demoframe{position:relative}.tet-header,.tet-icon-container,.tetadvanced-icon-container,.tetAlertBtns>div,.tetAlertTxt{text-align:center}.tet-help-container a,.tet-icon-container,#tetDemo,.tet{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.tet{flex-wrap:wrap;font-size:13px;overflow-wrap:break-word;height:-webkit-min-content;height:-moz-min-content;height:min-content;display:flex;-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important}.tetAvatarFrame{padding-bottom:100%;position:absolute;top:0px;right:0px;left:0px;bottom:0px}.tetAvatarFrame #tetAvatar{background-size:cover;background-repeat:no-repeat;background-position:center center;z-index:-1;height:100%;position:absolute}.tet-main{padding:0px 32px 32px 32px !important;display:grid;grid-template-rows:minmax(auto, 50%)}.tet-header{min-width:0px;white-space:normal;display:grid;padding:0px 32px 0px 32px;margin:32px 0px 12px 0px}.tet-header .tet-info-name{line-height:28px;font-size:23px;font-weight:800}.tetConfirmation{padding:8px 32px 16px 32px !important;border-radius:16px;top:50%;left:50%;transform:translate(-50%, -50%);position:fixed !important;z-index:10000 !important}.tetConfirmation .tetAlertTxt{align-content:center;display:grid;margin:0px !important}.tetConfirmation h1.tetAlertTxt{line-height:24px;font-size:20px;min-width:0px}.tetConfirmation div.tetAlertTxt{min-width:0px}.tetConfirmation .tetAlertBtns{margin:2% 0px 2% 0px;white-space:nowrap;transition-property:background-color,box-shadow;transition-duration:.2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-color:rgba(0,0,0,0);overflow:hidden;border-width:1px;border-style:solid}.tetConfirmation .tetAlertBtns span{line-height:inherit !important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:0px solid #000;box-sizing:border-box;display:inline;margin:0px;padding:0px}.tetConfirmation .tetAlertBtns span>span{border:0px solid #000;box-sizing:border-box;display:inline;margin:0px;padding:0px}#tetadvanced{border-radius:16px}#tetadvanced>div{border-radius:16px;flex-grow:1;flex-shrink:1}.btNav:not(.mobile) #tetForm{min-width:600px !important}#tetForm{border-radius:16px;flex-shrink:1;position:relative;overflow:hidden}#tetForm .tet-containter.tet-fg{margin-left:auto;margin-right:auto}#tetadvanced{max-width:90vw;max-height:90vh;min-width:500px;min-height:100px;flex-shrink:1;margin-left:1%;margin-right:1%}.tet-container{overflow:auto !important}.tetadvanced-container section.tetcheckbox>label,.tetadvanced-container section.tetselect{display:flex;justify-content:space-between;padding:.5em}.tetadvanced-container section.tetcheckbox>label{cursor:pointer}.tetadvanced-container .tetswitch{position:relative;width:38px;border-radius:20px;-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important;margin:5px}.tetadvanced-container .tetswitch>input{display:none}.tetadvanced-container .tetswitch>label{display:block;overflow:hidden;cursor:pointer;height:16px;padding:0;border-radius:20px;border:1px solid #000;background-color:#464646}.tetadvanced-container .tetswitch>label:before{content:"";display:block;width:20px;height:20px;margin:-2px;background:#dadce0;position:absolute;top:0;right:20px;border-radius:20px}.tetadvanced-container .tetswitch>input:checked+label{margin-left:0}.tetadvanced-container .tetswitch>input:checked+label:before{right:0px}.btNav span,#tweet-text span,#tetMenuButton span{color:inherit;font:inherit;font-family:"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif !important;white-space:inherit;overflow-wrap:break-word}.rm,#tetMenuButton.mobile,option[disabled=""],div:not(.mini)>#tetSVG,div.mini>span{display:none !important;visibility:hidden !important}.tetFreeze{overflow:hidden !important;-ms-scroll-chaining:none !important;overscroll-behavior:none !important}#tetMenuButton{z-index:10;width:8vw;height:auto;position:fixed;top:65%;left:0px}#tetMenuButton.tetTD{left:90% !important;top:0% !important}#tetMenuButton>svg{position:relative;height:1.25em;fill:currentcolor;margin-right:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;right:35% !important}.tetBtn{list-style:none;text-align:inherit;text-decoration:none;border-radius:15px;justify-content:center;text-align:center;display:flex !important;font-family:inherit !important;font-size:20px !important;font-weight:bold !important;padding:0px !important;outline:none !important}.tetBtn.mini{border:rgba(0,0,0,0) !important;background:rgba(0,0,0,0) !important}.tetBtn,#tet,.tet{cursor:pointer !important}.tet.tet-td{display:inherit}#tet{justify-items:center}#apifield{width:initial}#apifield,#tetName,#tetSelector>select{padding-left:2% !important}#apifield,#tetSelector{align-items:stretch;display:grid;border-style:solid;border-radius:4px;border-width:1px}#apifield,.tet-main #tetSelector,section.tetcheckbox{margin:2% 6% 0px 6%}#tetSelector>select{text-align:left;padding-top:12px;padding-right:0px;padding-bottom:0px;cursor:pointer;border-radius:0px;margin:0px;-webkit-appearance:none;-moz-appearance:none;appearance:none}#tetReset{margin:2% 25% 0px 25%}.r-demo{margin:0px 32px 0px 32px !important;padding:12px 0px 12px 0px !important;overflow:hidden;flex-direction:row !important}.r-demo .tet-av{position:relative;margin:2px 12px 0px 12px !important;flex-basis:48px;height:48px;overflow:hidden;display:block;z-index:0}.r-demo .tet-txt{flex-basis:0px;flex-grow:1;justify-content:center}.r-demo .tet-txt .txt-header{display:flex;margin-bottom:2px;justify-content:space-between;flex-direction:row;flex-shrink:1}.r-demo .tet-txt .txt-header .tet-at{display:flex;min-width:0px;max-width:inherit !important;white-space:normal !important}.r-demo .tet-txt .txt-header .tet-at>span:last-child{margin-left:4px}#tetDemo{margin:4px 0px 0px 0px;font-size:13px;flex-wrap:wrap;min-width:0px;display:flex !important}.btNav{-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important;justify-content:center !important;flex-direction:row !important;top:0px !important}.btNav a,.btNav :link{text-decoration:none !important}.btNav a:hover,.btNav :link:hover{text-decoration:none !important}.btNav,.navbackground{position:fixed !important;width:100vw;height:100vh}.navbackground{top:0;left:0}.navbackground.warn{z-index:10 !important}.tet-icon-container,.tetadvanced-icon-container{cursor:pointer;display:inline-flex;position:absolute;bottom:10px;border-radius:9999px;z-index:1}.tet-icon-container{height:35px;right:25px}.tet-icon-container .tet-icon-info{color:#fff;display:inline;width:35px;height:35px;line-height:35px;border-radius:inherit;font-family:"fontello";font-size:23px}.tet-icon-container .tet-icon-info:hover{color:unset !important}.tet-icon-container .tet-help-container{position:static;border-style:solid;border-width:2px;border-radius:inherit;line-height:35px;font-size:16px;font-weight:normal;text-decoration:none;margin-left:10px}.tet-icon-container .tet-help-container a{display:inline-block;margin-left:10px;margin-right:10px}.tetadvanced-icon-container{left:10px;width:28px;height:28px}.tetadvanced-icon-container .tetadvanced-icon{height:1.75rem;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;fill:currentcolor;border-radius:inherit;display:inline-block}.mini{min-height:3% !important;overflow:hidden;background:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.r-hover{-webkit-text-decoration-line:underline !important;text-decoration-line:underline !important}#tweet-text{font-size:23px !important;line-height:28px !important}.tet-help-info{color:unset}#tetNI{margin:0px 10% 0px 10%}div.css-18t94o4.r-6koalj.r-1w6e6rj.r-37j5jr.r-n6v787.r-16dba41.r-1cwl3u0.r-14gqq1x.r-bcqeeo.r-qvutc0{width:-webkit-fit-content !important;width:-moz-fit-content !important;width:fit-content !important}
`,
  nitterCSS = `#tetNT .tetBackground{border-color:var(--border_grey)}#tetNT .tetNitter#tetSelector:hover{border-color:var(--accent_border) !important;box-shadow:var(--accent_border) !important}#tetNT .tetNitter#tetSelector:hover #tetName span{color:var(--fg_dark)}#tetNT h1.tetNTextColor{color:var(--grey)}#tetNT .nitter:not(.tetswitch,.tetBtn){background-color:var(--bg_color)}#tetNT .nitter:not(.tetswitch,.tetBtn) div#tetName{color:var(--fg_dark)}#tetNT .tetBtn.nitter:not(.tet-29u,.tet-186u,.tet-122u,.tet-120u,.tet-249u,.tet-255u){color:var(--fg_color);background-color:var(--fg_dark)}#tetNT input.tetNTextColor,#tetNT select.tetNTextColor,#tetNT div.tetNTextColor,#tetNT svg.tetNTextColor,#tetNT label.tetNTextColor>span{color:var(--fg_color)}#tetNT .tetNText,#tetNT .tetNText span{color:var(--fg_dark) !important}#tetNT .tetNBackground{background-color:var(--bg_panel)}.tetNitterHover{background-color:var(--fg_dark)}#tetBTD .tweetdeck:not(.tetswitch){background-color:var(--btd-accent-color)}#tetBTD .r-tetTD{background-color:var(--btd-theme-background) !important}#tetBTD .r-tetTD#tetSelector.Button--primary:hover{border-color:#1da1f2;box-shadow:#1da1f2 0px 0px 0px 1px}#tetBTD .r-tetTD#tetSelector.Button--primary:hover #tetName span{color:#1da1f2}#tetBTD .r-tetBTD{background-color:var(--btd-theme-background) !important}#tetBTD .r-tetBTD #tetName span{color:var(--btd-accent-color)}
`,
  debugToggle = false,
  ghCDN = 'https://cdn.jsdelivr.net/gh';
  let languages = {
  en: {
    sel: `English (en)`,
    tw: `Translate with`,
    lg: `Language`,
    tr: `Translator`,
    ds: `Display`,
    menu: `Menu`,
    ao: `Auto`,
    th: `Theme`,
    df: `Default`,
    di: `Dim`,
    lo: `Lights out`,
    col: `Color`,
    cb: `Blue`,
    cy: `Yellow`,
    cr: `Red`,
    cp: `Purple`,
    co: `Orange`,
    cg: `Green`,
    t: `Text`,
    i: `Icon`,
    res: `Restore to Defaults`,
    l: `Loading`,
    quest: {
      head: `Are you sure?`,
      body: `Website will be reloaded.`,
      yes: `Yes`,
      no: `No`,
    },
  },
  zh: {
    sel: `中文 (zh)`,
    tw: `翻译与`,
    lg: `语种`,
    tr: `译者`,
    ds: `显示`,
    menu: `菜单`,
    ao: `自动的`,
    th: `主题`,
    df: `默认情况下`,
    di: `凹陷`,
    lo: `熄灯`,
    col: `颜色`,
    cb: `蓝色`,
    cy: `黄色`,
    cr: `红色`,
    cp: `紫色`,
    co: `橙色`,
    cg: `绿色`,
    t: `案文`,
    i: `图标`,
    res: `恢复`,
    l: `Loading`,
    quest: {
      head: `你确定吗？`,
      body: `网站将被重新加载`,
      yes: `是的`,
      no: `不确定`,
    },
  },
  bg: {
    sel: `Български (bg)`,
    tw: `Преведете с`,
    lg: `Език`,
    tr: `Преводач`,
    ds: `Показване на`,
    menu: `Меню`,
    ao: `Автоматичен`,
    th: `Тема`,
    df: `По подразбиране`,
    di: `Dim`,
    lo: `Изгасяне на осветлението`,
    col: `Цвят`,
    cb: `Синьо`,
    cy: `Жълто`,
    cr: `Червено`,
    cp: `Лилаво`,
    co: `Оранжево`,
    cg: `Зелено`,
    t: `Текст`,
    i: `Икона`,
    res: `Възстановявам`,
    l: `Loading`,
    quest: {
      head: `Сигурни ли сте?`,
      body: `Уебсайтът ще бъде презареден.`,
      yes: `Да`,
      no: `Не`,
    },
  },
  cs: {
    sel: `Česky (cs)`,
    tw: `Přeložit pomocí`,
    lg: `Jazyk`,
    tr: `Překladatel`,
    ds: `Zobrazit`,
    menu: `Nabídka`,
    ao: `Automatické`,
    th: `Téma`,
    df: `Výchozí`,
    di: `Dim`,
    lo: `Zhasnout světla`,
    col: `Barva`,
    cb: `Modrá`,
    cy: `Žlutá`,
    cr: `Červená`,
    cp: `Fialová`,
    co: `Oranžová`,
    cg: `Zelená`,
    t: `Text`,
    i: `Ikona`,
    res: `Obnovit`,
    l: `Loading`,
    quest: {
      head: `Jste si jistý?`,
      body: `Webové stránky budou znovu načteny.`,
      yes: `Ano`,
      no: `Ne`,
    },
  },
  da: {
    sel: `Dansk (da)`,
    tw: `Oversæt med`,
    lg: `Sprog`,
    tr: `Oversætter`,
    ds: `Vis`,
    menu: `Menu`,
    ao: `Automatisk`,
    th: `Tema`,
    df: `Standard`,
    di: `Dim`,
    lo: `Lyset slukkes`,
    col: `Farve`,
    cb: `Blå`,
    cy: `Gul`,
    cr: `Rød`,
    cp: `Lilla`,
    co: `Orange`,
    cg: `Grøn`,
    t: `Tekst`,
    i: `Ikon`,
    res: `Genskabe`,
    l: `Loading`,
    quest: {
      head: `Er du sikker?`,
      body: `Hjemmesiden vil blive genindlæst.`,
      yes: `Ja`,
      no: `Nej`,
    },
  },
  et: {
    sel: `Eesti (et)`,
    tw: `Tõlge koos`,
    lg: `Keel`,
    tr: `Tõlkija`,
    ds: `Kuva`,
    menu: `Menüü`,
    ao: `Automaatne`,
    th: `Teema`,
    df: `Vaikimisi`,
    di: `Dim`,
    lo: `Valgus välja lülitatud`,
    col: `Värv`,
    cb: `Sinine`,
    cy: `Kollane`,
    cr: `Punane`,
    cp: `Lilla`,
    co: `Oranž`,
    cg: `Roheline`,
    t: `Tekst`,
    i: `Ikoon`,
    res: `Taastada`,
    l: `Loading`,
    quest: {
      head: `Oled sa kindel?`,
      body: `Veebileht laaditakse uuesti.`,
      yes: `Jah`,
      no: `Ei`,
    },
  },
  fi: {
    sel: `Suomalainen (fi)`,
    tw: `Käännä kanssa`,
    lg: `Kieli`,
    tr: `Kääntäjä`,
    ds: `Näytä`,
    menu: `Valikko`,
    ao: `Automaattinen`,
    th: `Teema`,
    df: `Oletus`,
    di: `Dim`,
    lo: `Valot pois päältä`,
    col: `Väri`,
    cb: `Sininen`,
    cy: `Keltainen`,
    cr: `Punainen`,
    cp: `Violetti`,
    co: `Oranssi`,
    cg: `Vihreä`,
    t: `Teksti`,
    i: `Kuvake`,
    res: `Palauta`,
    l: `Loading`,
    quest: {
      head: `Oletko varma?`,
      body: `Sivusto ladataan uudelleen.`,
      yes: `Kyllä`,
      no: `Ei`,
    },
  },
  el: {
    sel: `Ελληνική (el)`,
    tw: `Μεταφράστε με`,
    lg: `Γλώσσα`,
    tr: `Μεταφραστής`,
    ds: `Εμφάνιση`,
    menu: `Μενού`,
    ao: `Αυτόματο`,
    th: `Θέμα`,
    df: `Προεπιλογή`,
    di: `Dim`,
    lo: `Σβήνει τα φώτα`,
    col: `Χρώμα`,
    cb: `Μπλε`,
    cy: `Κίτρινο`,
    cr: `Κόκκινο`,
    cp: `Μωβ`,
    co: `Πορτοκαλί`,
    cg: `Πράσινο`,
    t: `Κείμενο`,
    i: `Εικονίδιο`,
    res: `Επαναφορά`,
    l: `Loading`,
    quest: {
      head: `Είσαι σίγουρος;`,
      body: `Η ιστοσελίδα θα επαναφορτωθεί.`,
      yes: `Ναι`,
      no: `Όχι`,
    },
  },
  hu: {
    sel: `Magyar (hu)`,
    tw: `Fordítson a`,
    lg: `Nyelv`,
    tr: `Fordító`,
    ds: `Megjelenítés`,
    menu: `Menü`,
    ao: `Automatikus`,
    th: `Téma`,
    df: `Alapértelmezett`,
    di: `Dim`,
    lo: `Fények kikapcsolva`,
    col: `Szín`,
    cb: `Kék`,
    cy: `Sárga`,
    cr: `Piros`,
    cp: `Lila`,
    co: `Narancs`,
    cg: `Zöld`,
    t: `Szöveg`,
    i: `Ikon`,
    res: `Visszaállítása`,
    l: `Loading`,
    quest: {
      head: `Biztos vagy benne?`,
      body: `A weboldal újratöltődik.`,
      yes: `Igen`,
      no: `Nem`,
    },
  },
  lv: {
    sel: `Latviešu (lv)`,
    tw: `Tulkot ar`,
    lg: `Valoda`,
    tr: `Tulkotājs`,
    ds: `Displejs`,
    menu: `Izvēlne`,
    ao: `Automātiskais`,
    th: `Tēma`,
    df: `Noklusējuma`,
    di: `Dim`,
    lo: `Izslēgt gaismu`,
    col: `Krāsa`,
    cb: `Zils`,
    cy: `Dzeltens`,
    cr: `Sarkans`,
    cp: `Violeta`,
    co: `Oranža`,
    cg: `Zaļš`,
    t: `Teksts`,
    i: `Ikona`,
    res: `Atjaunot`,
    l: `Loading`,
    quest: {
      head: `Vai esat pārliecināts?`,
      body: `Tīmekļa vietne tiks ielādēta no jauna.`,
      yes: `Jā`,
      no: `Nē`,
    },
  },
  lt: {
    sel: `Lietuvių kalba (lt)`,
    tw: `Išversti su`,
    lg: `Kalba`,
    tr: `Vertėjas`,
    ds: `Rodyti`,
    menu: `Meniu`,
    ao: `Automatinis`,
    th: `Tema`,
    df: `Numatytoji`,
    di: `Dim`,
    lo: `Išjungti šviesą`,
    col: `Spalva`,
    cb: `Mėlyna`,
    cy: `Geltona`,
    cr: `Raudona`,
    cp: `Violetinė`,
    co: `Oranžinė`,
    cg: `Žalia`,
    t: `Tekstas`,
    i: `Ikona`,
    res: `Atkurti`,
    l: `Loading`,
    quest: {
      head: `Ar tikrai?`,
      body: `Svetainė bus iš naujo įkelta.`,
      yes: `Taip`,
      no: `Ne`,
    },
  },
  ro: {
    sel: `Românesc (ro)`,
    tw: `Tradu cu`,
    lg: `Limba`,
    tr: `Traducător`,
    ds: `Afișați`,
    menu: `Meniu`,
    ao: `Automat`,
    th: `Tema`,
    df: `Implicit`,
    di: `Dim`,
    lo: `Stinge lumina`,
    col: `Culoare`,
    cb: `Albastru`,
    cy: `Galben`,
    cr: `Roșu`,
    cp: `Violet`,
    co: `Portocaliu`,
    cg: `Verde`,
    t: `Text`,
    i: `Icoană`,
    res: `Restaurați`,
    l: `Loading`,
    quest: {
      head: `Ești sigur?`,
      body: `Site-ul va fi reîncărcat.`,
      yes: `Da`,
      no: `Nu`,
    },
  },
  sk: {
    sel: `Slovenská (sk)`,
    tw: `Preložiť s`,
    lg: `Jazyk`,
    tr: `Prekladateľ`,
    ds: `Zobraziť`,
    menu: `Ponuka`,
    ao: `Automatické`,
    th: `Téma`,
    df: `Predvolené nastavenie`,
    di: `Dim`,
    lo: `Zhasnuté svetlá`,
    col: `Farba`,
    cb: `Modrá`,
    cy: `Žltá`,
    cr: `Červená`,
    cp: `Fialová`,
    co: `Oranžová`,
    cg: `Zelená`,
    t: `Text`,
    i: `Ikona`,
    res: `Obnovenie`,
    l: `Loading`,
    quest: {
      head: `Ste si istý?`,
      body: `Webová stránka bude znovu načítaná.`,
      yes: `Áno`,
      no: `Nie`,
    },
  },
  sl: {
    sel: `Slovenski (sl)`,
    tw: `Prevedi z`,
    lg: `Jezik`,
    tr: `Prevajalec`,
    ds: `Prikaži`,
    menu: `Meni`,
    ao: `Samodejno`,
    th: `Tema`,
    df: `Privzeto`,
    di: `Dim`,
    lo: `Ugasne luči`,
    col: `Barva`,
    cb: `Modra`,
    cy: `Rumena`,
    cr: `Rdeča`,
    cp: `Vijolična`,
    co: `Oranžna`,
    cg: `Zelena`,
    t: `Besedilo`,
    i: `Ikona`,
    res: `Obnovitev`,
    l: `Loading`,
    quest: {
      head: `Ste prepričani?`,
      body: `Spletna stran bo ponovno naložena.`,
      yes: `Da`,
      no: `Ne`,
    },
  },
  sv: {
    sel: `Svenska (sv)`,
    tw: `Översätt med`,
    lg: `Språk`,
    tr: `Översättare`,
    ds: `Visa`,
    menu: `Meny`,
    ao: `Automatisk`,
    th: `Tema`,
    df: `Standard`,
    di: `Dim`,
    lo: `Ljuset släcks`,
    col: `Färg`,
    cb: `Blå`,
    cy: `Gul`,
    cr: `Röd`,
    cp: `Lila`,
    co: `Orange`,
    cg: `Grön`,
    t: `Text`,
    i: `Ikon`,
    res: `Återställ`,
    l: `Loading`,
    quest: {
      head: `Är du säker?`,
      body: `Webbplatsen kommer att laddas om.`,
      yes: `Ja`,
      no: `Nej`,
    },
  },
  nl: {
    sel: `Nederlands (nl)`,
    tw: `Vertaal met`,
    lg: `Taal`,
    tr: `Vertaler`,
    ds: `Weergave`,
    menu: `Menu`,
    ao: `Automatisch`,
    th: `Thema`,
    df: `Standaard`,
    di: `Dimmen`,
    lo: `Licht uit`,
    col: `Kleur`,
    cb: `Blauw`,
    cy: `Geel`,
    cr: `Rood`,
    cp: `Paars`,
    co: `Oranje`,
    cg: `Groen`,
    t: `Tekst`,
    i: `Icoon`,
    res: `Herstel`,
    l: `Loading`,
    quest: {
      head: `Ben je zeker?`,
      body: `De website wordt opnieuw geladen.`,
      yes: `Ja`,
      no: `Nee`,
    },
  },
  fr: {
    sel: `Français (fr)`,
    tw: `Traduire avec`,
    lg: `Langue`,
    tr: `Traducteur`,
    ds: `Afficher`,
    menu: `Menu`,
    ao: `Automatique`,
    th: `Thème`,
    df: `Défaut`,
    di: `Dim`,
    lo: `Extinction des lumières`,
    col: `Couleur`,
    cb: `Bleu`,
    cy: `Jaune`,
    cr: `Rouge`,
    cp: `Violet`,
    co: `Orange`,
    cg: `Vert`,
    t: `Texte`,
    i: `Icône`,
    res: `Restaurer`,
    l: `Loading`,
    quest: {
      head: `Vous êtes sûr ?`,
      body: `Le site web va être rechargé.`,
      yes: `Oui`,
      no: `Non`,
    },
  },
  de: {
    sel: `Deutsch (de)`,
    tw: `Übersetzen mit`,
    lg: `Sprache`,
    tr: `Übersetzer`,
    ds: `Anzeige`,
    menu: `Menü`,
    ao: `Automatisch`,
    th: `Thema`,
    df: `Standard`,
    di: `Dimmen`,
    lo: `Licht aus`,
    col: `Farbe`,
    cb: `Blau`,
    cy: `Gelb`,
    cr: `Rot`,
    cp: `Lila`,
    co: `Orange`,
    cg: `Grün`,
    t: `Text`,
    i: `Icon`,
    res: `Wiederherstellen`,
    l: `Loading`,
    quest: {
      head: `Sind Sie sicher?`,
      body: `Die Website wird neu geladen.`,
      yes: `Ja`,
      no: `Nein`,
    },
  },
  it: {
    sel: `Italiano (it)`,
    tw: `Tradurre con`,
    lg: `Lingua`,
    tr: `Traduttore`,
    ds: `Visualizza`,
    menu: `Menu`,
    ao: `Automatico`,
    th: `Tema`,
    df: `Default`,
    di: `Dim`,
    lo: `Luci spente`,
    col: `Colore`,
    cb: `Blu`,
    cy: `Giallo`,
    cr: `Rosso`,
    cp: `Viola`,
    co: `Arancione`,
    cg: `Verde`,
    t: `Testo`,
    i: `Icona`,
    res: `Ripristinare`,
    l: `Loading`,
    quest: {
      head: `Sei sicuro?`,
      body: `Il sito sarà ricaricato.`,
      yes: `Sì`,
      no: `No`,
    },
  },
  ja: {
    sel: `日本語 (ja)`,
    tw: `で翻訳する`,
    lg: `言語`,
    tr: `翻訳者`,
    ds: `ディスプレイ`,
    menu: `メニュー`,
    ao: `自動`,
    th: `テーマ`,
    df: `デフォルト`,
    di: `暗い`,
    lo: `消灯`,
    col: `カラー`,
    cb: `青`,
    cy: `黄`,
    cr: `赤`,
    cp: `紫`,
    co: `オレンジ`,
    cg: `グリーン`,
    t: `テキスト`,
    i: `アイコン`,
    res: `リストア`,
    l: `Loading`,
    quest: {
      head: `本当にいいの？`,
      body: `ウェブサイトが再読み込みされます。`,
      yes: `はい`,
      no: `いいえ`,
    },
  },
  pl: {
    sel: `Polski (pl)`,
    tw: `Tłumaczenie za pomocą`,
    lg: `Język`,
    tr: `Tłumacz`,
    ds: `Wyświetlacz`,
    menu: `Menu`,
    ao: `Automatyczny`,
    th: `Motyw`,
    df: `Domyślnie`,
    di: `Ściemniaj`,
    lo: `Nie świeci się`,
    col: `Kolor`,
    cb: `Niebieski`,
    cy: `Żółty`,
    cr: `Czerwony`,
    cp: `Purpurowy`,
    co: `Pomarańczowy`,
    cg: `Zielony`,
    t: `Tekst`,
    i: `Ikona`,
    res: `Przywróć`,
    l: `Loading`,
    quest: {
      head: `Czy jesteś pewien?`,
      body: `Strona zostanie przeładowana.`,
      yes: `Tak`,
      no: `Nie`,
    },
  },
  pt: {
    sel: `Português (pt)`,
    tw: `Traduzir com`,
    lg: `Idioma`,
    tr: `Tradutora`,
    ds: `Mostrar`,
    menu: `Menu`,
    ao: `Automático`,
    th: `Tema`,
    df: `Por defeito`,
    di: `Dim`,
    lo: `Luzes apagadas`,
    col: `Cor`,
    cb: `Azul`,
    cy: `Amarelo`,
    cr: `Vermelho`,
    cp: `Púrpura`,
    co: `Laranja`,
    cg: `Verde`,
    t: `Texto`,
    i: `Ícone`,
    res: `Restaurar`,
    l: `Loading`,
    quest: {
      head: `Tem a certeza?`,
      body: `O website será carregado de novo.`,
      yes: `Sim`,
      no: `Não`,
    },
  },
  ru: {
    sel: `Russisch (ru)`,
    tw: `Перевод с`,
    lg: `Язык`,
    tr: `Переводчик`,
    ds: `Показать`,
    menu: `Меню`,
    ao: `Автоматический`,
    th: `Тема`,
    df: `По умолчанию`,
    di: `Приглушить`,
    lo: `Выключить свет`,
    col: `Цвет`,
    cb: `Синий`,
    cy: `Желтый`,
    cr: `Красный`,
    cp: `Фиолетовый`,
    co: `Оранжевый`,
    cg: `Зеленый`,
    t: `Текст`,
    i: `иконка`,
    res: `Восстановить`,
    l: `Loading`,
    quest: {
      head: `Вы уверены?`,
      body: `Сайт будет перезагружен.`,
      yes: `Да`,
      no: `Нет`,
    },
  },
  es: {
    sel: `Español (es)`,
    tw: `Traducir con`,
    lg: `Idioma`,
    tr: `Traductor`,
    ds: `Mostrar`,
    menu: `Menú`,
    ao: `Automático`,
    th: `Tema`,
    df: `Por defecto`,
    di: `Atenuar`,
    lo: `Luces apagadas`,
    col: `Colores`,
    cb: `Azul`,
    cy: `Amarillo`,
    cr: `Rojo`,
    cp: `Púrpura`,
    co: `Naranja`,
    cg: `Verde`,
    t: `Texto`,
    i: `Icono`,
    res: `Restaurar`,
    l: `Loading`,
    quest: {
      head: `¿Está seguro?`,
      body: `El sitio web será recargado.`,
      yes: `Sí`,
      no: `No`,
    },
  },
};

  //#region Config
// eslint-disable-next-line no-unused-vars
let debug = (...msg) => console.log('[%cTET%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg),
checkSupport = typeof GM_xmlhttpRequest !== 'undefined' || typeof GM.xmlhttpRequest !== 'undefined',
TM = {
  getResourceText: (typeof GM_getResourceText !== 'undefined') ? GM_getResourceText : GM.getResourceText,
  getValue: (typeof GM_getValue !== 'undefined') ? GM_getValue : GM.getValue,
  info: (typeof GM_info !== 'undefined') ? GM_info : GM.info,
  openInTab: (typeof GM_openInTab !== 'undefined') ? GM_openInTab : GM.openInTab,
  setValue: (typeof GM_setValue !== 'undefined') ? GM_setValue : GM.setValue,
  xmlhttpRequest: (typeof GM_xmlhttpRequest !== 'undefined') ? GM_xmlhttpRequest : GM.xmlhttpRequest,
},
tetInfo = {
  icon: TM.info.script.icon,
  name: TM.info.script.name,
  version: TM.info.script.version,
  namespace: TM.info.script.namespace
},
dLng = 'en';
const win = self ?? window,
doc = win.document,
/** Error handling for UserScript */
err = (...msg) => {console.error('[%cTET%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg)},
delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
qs = (element, root = document) => root.querySelector(element),
/** Element | querySelector all */
qsA = (element,root = document) => root.querySelectorAll(element),
mobile = navigator.userAgent.match(/mobile/gi),
/** Can create various elements */
make = (element,cname,attrs = {}) => {
  let el = doc.createElement(element);
  cname ? (el.className = cname) : false;
  if(attrs) {for(let key in attrs) {el[key] = attrs[key]}};
  return el;
},
/**
* addEventListener
* @param {string} elm - Element
* @param {Options|string} event - Event type
* @param {Function} callback - Callback function
*/
ael = (elm,event,callback) => {
  elm = elm ?? doc;
  if(mobile) {
    if(event === "click") {
      elm.addEventListener('mouseup', callback);
      elm.addEventListener('touchend', callback);
    } else if(event === "mouseenter") {
      elm.addEventListener('touchenter', callback);
    } else if(event === "mouseleave") {
      elm.addEventListener('touchleave', callback);
    };
  };
  return elm.addEventListener(event, callback);
},
openPage = (url,params = { active: true, insert: true }) => {
  if(checkSupport) {
    return TM.openInTab(url,params);
  } else {
    return win.open(url,'_blank');
  };
},
/** If querySelector(`element`) exists then querySelectorAll */
qa = async (selector,root) => {
  return await new Promise((resolve) => {
    root = root ?? doc;
    if(root.querySelector(selector) === null) {throw new Error(`Element(s) not found ${root}.querySelector(${selector})`)};
    resolve(root.querySelectorAll(selector));
  }).catch(e => err(e));
},
/** element, mouseenterFn, mouseleaveFn */
mouseEvents = (elms,enter,leave) => {
  leave = leave ?? enter;
  if(typeof elms === "string") {
    qa(elms).then((elements) => {
      for(let e of elements) {
        ael(e,'mouseenter',enter);
        ael(e,'mouseleave',leave);
      };
    })
  } else {
    for(let e of elms) {
      ael(e,'mouseenter',enter);
      ael(e,'mouseleave',leave);
    };
  };
},
defaultDesc = "Pretend I'm a foreign language.",
lh = doc.location.host,
lr = doc.location.href,
find = {
  logout: !getCookie("twid"),
  nitter: (/nitter|nittr|twitr|bird|hyper/.test(lr) || lh === "twitter.076.ne.jp" || lh === "nttr.stream" || lh === "twitter.censors.us"),
  twitter: (lh === "twitter.com" || lh === "mobile.twitter.com"),
  tweetdeck: (lh === "tweetdeck.twitter.com"),
  twitlonger: (lh === "www.twitlonger.com"),
  remover: (/begin_password_reset|account|logout|login|signin|signout/.test(lr)),
},
lngFN = () => {
  for(const key in languages) {
    if(typeof win.navigator.languages !== 'undefined') {
      for(let l of win.navigator.languages) {
        if(l !== key) continue;
        dLng = l;
        break;
      };
    } else {
      dLng = win.navigator.language ?? qs("html").lang;
      break;
    };
  };
},
toDataURL = (src) => fetchURL(src, 'GET', 'blob'),
/** Favicons
* Each converted to "Data URI" as to prevent blocking.
* Direct Links
* azure: "https://azurecomcdn.azureedge.net/cvt-a8c88a5179d0dccbd8e4f14c3cca7706721477d322eb184796320391845f73d9/images/icon/favicon.ico",
* bing: "https://www.bing.com/th?id=OTT.7A274AA188550691D09FA80F322A58D2&pid=Trans",
* deepl: "https://static.deepl.com/img/favicon/favicon_16.png",
* gCloud: "https://www.gstatic.com/devrel-devsite/prod/v48d5b7fe78425d6a73163cf28706f05fb6b7cff97bdc98bbcd2f38818604a511/cloud/images/favicons/onecloud/favicon.ico",
* google: "https://ssl.gstatic.com/translate/favicon.ico",
* libre: "https://libretranslate.com/static/favicon.ico",
* lingva: "https://lingva.ml/favicon-16x16.png",
* mymemory: "https://mymemory.translated.net/public/img/favicon-16x16.png",
* translate: "https://www.translate.com/next/images/favicon/favicon.svg",
* yandex: "https://translate.yandex.com/icons/favicon.ico",
*/
iconData = {
  azure: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/azure.ico`,
  bing: '<svg class="exIcon" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_ii_303_1254)"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.8461 10.0758C18.9256 9.12311 18.7462 7.55996 17.4833 7.23245C16.9836 7.10291 17.1762 6.49342 17.8179 6.6309C18.8394 6.84976 21.1381 7.42045 21.4505 10.0816C22.8741 10.1747 24 11.3589 24 12.8063V20.5614C24 22.0694 22.7777 23.2919 21.2697 23.2919H12.3597C10.8516 23.2919 9.62915 22.0694 9.62915 20.5614V12.8063C9.62915 11.2983 10.8516 10.0758 12.3597 10.0758H18.8461Z" fill="url(#paint0_linear_303_1254)"/></g><path d="M16.9721 13.1131L15.8383 13.0869C15.847 13.2353 15.8296 13.4446 15.8209 13.6101C15.8034 13.7585 15.786 13.9155 15.7685 14.0812C15.6552 14.0812 15.5418 14.0812 15.4197 14.0812C14.8878 14.0812 14.1203 14.0114 13.8151 13.9591L13.8412 14.9706C14.2511 14.9882 14.9314 15.0231 15.3847 15.0231C15.4808 15.0231 15.568 15.0231 15.6639 15.0231C15.629 15.3806 15.6029 15.7469 15.5854 16.1218C14.3645 16.6974 13.4401 17.866 13.4401 18.9911C13.4401 19.872 13.9806 20.2557 14.6173 20.2557C15.0795 20.2557 15.5418 20.116 15.9691 19.9067C16.004 20.0288 16.0476 20.1509 16.0825 20.2644L17.0853 19.9592C17.0157 19.7499 16.9459 19.5318 16.8849 19.3137C17.5476 18.7644 18.2454 17.8486 18.7163 16.6625C19.318 16.8981 19.6232 17.3603 19.6232 17.8835C19.6232 18.7382 18.943 19.5928 17.2599 19.7759L17.8354 20.6917C19.9807 20.369 20.7046 19.1742 20.7046 17.9358C20.7046 16.9241 20.0332 16.1306 19.0215 15.7992C19.0738 15.6335 19.1436 15.4504 19.1785 15.3543L18.1146 15.1016C18.1057 15.2324 18.071 15.4504 18.0361 15.6248C17.9838 15.6248 17.9313 15.6248 17.879 15.6248C17.4517 15.6248 16.9981 15.6858 16.5797 15.7817C16.5884 15.5201 16.6144 15.2498 16.6407 14.9882C17.7133 14.9446 18.882 14.8398 19.7367 14.6829L19.7278 13.6713C18.7686 13.898 17.8267 14.0114 16.7628 14.055C16.7888 13.8806 16.8237 13.7236 16.85 13.5754C16.8849 13.4446 16.9198 13.2875 16.9721 13.1131ZM14.4691 18.7644C14.4691 18.2673 14.9051 17.6044 15.5593 17.1597C15.5767 17.7614 15.6465 18.3631 15.7424 18.9039C15.4283 19.087 15.1144 19.1917 14.8702 19.1917C14.5912 19.1917 14.4691 19.0434 14.4691 18.7644ZM16.5448 16.7324V16.7061C16.8849 16.6016 17.286 16.523 17.7482 16.5144C17.4517 17.2207 17.0593 17.7527 16.6493 18.18C16.5797 17.744 16.5448 17.2643 16.5448 16.7324Z" fill="white"/><g filter="url(#filter1_iii_303_1254)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.73048 0C1.22248 0 0 1.22248 0 2.73048V11.1329C0 12.5763 1.11978 13.758 2.53795 13.8568C3.08413 16.2072 5.2571 16.7445 6.25894 16.9591C6.93205 17.1033 7.13404 16.464 6.61 16.3282C5.49604 16.0391 5.18562 14.8339 5.16464 13.8634H12.3443C13.8523 13.8634 15.0748 12.6409 15.0748 11.1329V2.73048C15.0748 1.22248 13.8523 0 12.3443 0H2.73048Z" fill="white" fill-opacity="0.55"/></g><path d="M11.1457 11.222H9.7463L9.0546 9.2648H6.03037L5.36546 11.222H3.97131L6.85077 3.53271H8.28782L11.1457 11.222ZM8.71678 8.22456L7.64972 5.15743C7.61755 5.05733 7.58359 4.89648 7.54784 4.67484H7.52639C7.49421 4.8786 7.45848 5.03946 7.41916 5.15743L6.36282 8.22456H8.71678Z" fill="url(#paint1_linear_303_1254)"/><defs><filter id="filter0_ii_303_1254" x="9.62915" y="6.61084" width="14.3708" height="20.1222" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="3.44103"/><feGaussianBlur stdDeviation="3.44103"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="shape" result="effect1_innerShadow_303_1254"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="3.42649"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/><feBlend mode="normal" in2="effect1_innerShadow_303_1254" result="effect2_innerShadow_303_1254"/></filter><filter id="filter1_iii_303_1254" x="-0.860258" y="0" width="15.9351" height="19.561" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="-0.860258" dy="2.58077"/><feGaussianBlur stdDeviation="2.58077"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0.0447222 0 0 0 0 0.2576 0 0 0 0 0.670833 0 0 0 0.23 0"/><feBlend mode="normal" in2="shape" result="effect1_innerShadow_303_1254"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="6.45193"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="effect1_innerShadow_303_1254" result="effect2_innerShadow_303_1254"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="3.0109"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/><feBlend mode="normal" in2="effect2_innerShadow_303_1254" result="effect3_innerShadow_303_1254"/></filter><linearGradient id="paint0_linear_303_1254" x1="15.0182" y1="8.7922" x2="24.6019" y2="23.4972" gradientUnits="userSpaceOnUse"><stop stop-color="#81D1FF"/><stop offset="1" stop-color="#4667DD"/></linearGradient><linearGradient id="paint1_linear_303_1254" x1="9.74939" y1="12.2128" x2="3.10203" y2="0.247467" gradientUnits="userSpaceOnUse"><stop stop-color="#66BAF7"/><stop offset="1" stop-color="#2B39BB"/></linearGradient></defs></svg>',
  deepl: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/deepl.png`,
  gCloud: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/googlecloud.ico`,
  google: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/google.ico`,
  libre: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/libre.ico`,
  lingva: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/lingva.png`,
  mymemory: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/mymemory.png`,
  translate: '<svg class="exIcon" width="16" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M64.6006 22.3721V129.65H37.4665V22.3721H0V0H102.157V22.3721H64.6006ZM131.504 95.3904C141.14 85.6492 148.472 73.6038 153.814 58.835H108.984C114.116 72.8706 121.553 85.2303 131.504 95.3904ZM178.952 51.1887V58.835H162.822C156.642 76.0129 148.367 89.839 137.474 100.837C148.891 110.473 163.031 117.596 180 121.576C178.114 123.357 175.601 126.918 174.448 129.118C156.956 124.614 142.711 117.072 131.19 106.703C119.668 116.548 105.527 123.776 88.6638 129.222C87.9306 127.337 85.4168 123.566 83.7409 121.786C100.395 116.967 114.116 110.264 125.324 101.046C114.535 89.6295 106.365 75.4891 100.395 58.835H84.9978V51.1887H127.628V33.4871H135.484V51.1887H178.952Z" fill="#27A2F8"/></svg>',
  yandex: `${ghCDN}/magicoflolis/twitter-translator/dist/icons/yandex.ico`,
  async fn() {
    return {
      azure: `<img class="exIcon" width="16" src="${await toDataURL(this.azure)}"/>`,
      bing: this.bing,
      deepl: `<img class="exIcon" width="16" src="${await toDataURL(this.deepl)}"/>`,
      gCloud: `<img class="exIcon" width="16" src="${await toDataURL(this.gCloud)}"/>`,
      google: `<img class="exIcon" width="16" src="${await toDataURL(this.google)}"/>`,
      libre: `<img class="exIcon" width="16" src="${await toDataURL(this.libre)}"/>`,
      lingva: `<img class="exIcon" width="16" src="${await toDataURL(this.lingva)}"/>`,
      mymemory: `<img class="exIcon" width="16" src="${await toDataURL(this.mymemory)}"/>`,
      translate: this.translate,
      yandex: `<img class="exIcon" width="16" src="${await toDataURL(this.yandex)}"/>`,
    }
  }
};
let TETConfig = {},
iconCache = {},
lng = {},
cBG = "rgba(91, 112, 131, 0.4)",
cColor = "r-p1n3y5 r-1bih22f",
cHover = "r-1q3imqu",
cText = "r-jwli3a",
cTheme = "r-kemksi",
cSub = "r-13gxpu9",
tet = {
  defaultcfg: {
    debug: debugToggle,
    lang: dLng,
    translator: 'deepl',
    display: "text + icon",
    colors: "auto",
    theme: "auto",
    delay: "none",
    sitetheme: true,
    api: {
      deepl: "",
      google: "",
      libre: "",
      translate: "",
      yandex: "",
      version: "api-free",
    },
    url: {
      bing: "https://www.bing.com",
      bingIT: "",
      deepl: "https://www.deepl.com",
      deeplIT: "https://api.deepl.com",
      google: "https://translate.google.com",
      googleIT: "https://translation.googleapis.com",
      libre: "https://translate.argosopentech.com/translate",
      lingva: "https://lingva.ml",
      mymemory: "https://mymemory.translated.net",
      mymemoryIT: "https://api.mymemory.translated.net",
      translate: "https://www.translate.com",
      translateIT: "https://api.translate.com/translate/v1/mt",
      yandex: "https://translate.yandex.com",
      yandexIT: "https://translate.api.cloud.yandex.net/translate/v2/translate",
    },
    nitterInstances: [],
  },
  /** Waits until `args` return true */
  async check(args) {
      while (args) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
      }
      return args;
  },
  halt(e) {
      e.preventDefault();
      e.stopPropagation();
  },
  /** Information handling for userscript */
  info(...message) {
    if(!TETConfig["debug"]) return;
    console.info('[%cTET%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  /**
  * Will inject CSS into the head of the document.
  * @param {string} css - The CSS to inject
  * @param {string} name - Each CSS starts with the following IDs: #tet-${common/foreign/etc}
  */
  loadCSS(css,name) {
    name = name ?? "common";
    let s = make("style",null, {
      id: `tet-${name}`,
      innerHTML: css,
    });
    (doc.head || doc.documentElement || doc).appendChild(s);
  },
  /** Log handling for userscript */
  log(...msg) {
    if(!TETConfig["debug"]) return;
    console.log('[%cTET%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg);
  },
  /**
    * @param {Node} element
    * @param {MutationCallback} callback
    * @param {MutationObserverInit} options
    */
  observe(element, callback, options = {subtree:true,childList:true}) {
      let observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
  },
  /**
   * Waits until querySelector(`element`) exists
   * @source {@link https://stackoverflow.com/a/53269990/9872174}
   */
  async query(selector,root) {
    root = root ?? doc;
    while ( root.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    };
    return root.querySelector(selector);
  },
  /** Saves config to localStorage + UserJS storage */
  save() {
    try {
      TM.setValue('Config',JSON.stringify(TETConfig));
      localStorage.setItem('TETConfig',JSON.stringify(TETConfig));
    } catch(e) {err(e)};
  },
},
fetchURL = (url,method = 'GET',responseType = 'json',params = {}) => {
  return new Promise((resolve, reject) => {
    if(checkSupport) {
      TM.xmlhttpRequest({
        method: method,
        url,
        responseType,
        ...params,
        onprogress: p => tet.info(`Progress: ${p.loaded} / ${p.total}`),
        onerror: e => reject(e),
        onload: (r) => {
          if(r.status !== 200) reject(`${r.status} ${url}`);
          if(responseType === 'blob') {
            let reader = new FileReader();
            reader.readAsDataURL(r.response);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          } else {
            resolve(r.response);
          }
        },
      });
    } else {
      fetch(url, {
        method: method,
        ...params,
      }).then((response) => {
        if(!response.ok) reject(response);
        if(responseType.includes('json')) {
          resolve(response.json());
        } else if(responseType.includes('text')) {
          resolve(response.text());
        } else if(responseType.includes('blob')) {
          resolve(response.blob());
        };
        resolve(response);
      });
    };
  });
},
menu = `<div class="navbackground rm"></div>
<div class="tetConfirmation tetBackground rm">
  <h1 class="tetAlertTxt tetTextColor"><span>${languages.en.quest.head}</span></h1>
  <div class="tetAlertTxt tetTextColor"><span>${languages.en.quest.body}</span></div>
  <div class="tetAlertBtns confirm tetBtn" style="background-color: rgb(239, 243, 244);" data-testid="confirmationSheetConfirm">
    <div style="color: rgb(15, 20, 25);"><span><span class="tet-confirm">${languages.en.quest.yes}</span></span></div>
  </div>
  <div class="tetAlertBtns deny tetDisplayColor tetBtn" data-testid="confirmationSheetCancel">
    <div style="color: rgb(239, 243, 244);"><span><span class="tet-deny">${languages.en.quest.no}</span></span></div>
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
      <div class="tet-at tetTextColor"><span>${tetInfo.name}</span><span class="tetTextColor">@for_lollipops</span></div>
    </div>
    <div class="tetTextColor tet-dc"><span class="tet-demotext">${!checkSupport ? 'ERROR Unable to resolve GM_ or GM. objects' : defaultDesc}</span></div>
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
      <section class="tetcheckbox tetst rm">
        <label class="tetTextColor">
          <span>Use website theme</span>
          <div class="tetswitch tetDisplayColor">
            <input type="checkbox" name="sitetheme" id="sitetheme" />
            <label for="sitetheme"></label>
          </div>
        </label>
      </section>
      <section class="tetcheckbox">
        <label class="tetTextColor">
          <span>Console log</span>
          <div class="tetswitch tetDisplayColor">
            <input type="checkbox" name="debug" id="debug" />
            <label for="debug"></label>
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
    <a class="tet-help-info tetTextColor" href="${tetInfo.namespace}" target="_blank">Visit GitHub ⤴</a>
  </div>
</div>`,
tetMenuButton = make("div","mini tetDisplayColor tetBtn", {
  id: "tetMenuButton",
  title: languages.en.menu,
  innerHTML: `<svg viewBox="0 0 24 24" id="tetSVG" class="tetTextColor" width="15"><g><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm8.472 9.442c-.242.19-.472.368-.63.486-.68-1.265-1.002-1.78-1.256-2.007-.163-.145-.37-.223-.78-.375-.367-.136-1.482-.55-1.65-.85-.087-.153.136-.602.23-.793.088-.177.164-.33.196-.497.123-.646-.33-1.146-.728-1.59-.066-.072-.153-.17-.23-.26.335-.12.862-.26 1.42-.384 1.95 1.448 3.26 3.704 3.428 6.272zm-9.788-7.83c.076.25.145.5.182.678-.255.15-.663.363-.96.52-.262.136-.522.273-.738.392-.247.137-.442.234-.6.313-.347.174-.598.3-.833.553-.068.073-.26.278-1.02 1.886l-1.79-.656c1.293-1.94 3.362-3.31 5.76-3.685zM12 20.5c-4.687 0-8.5-3.813-8.5-8.5 0-1.197.25-2.335.7-3.37.47.182 1.713.66 2.75 1.035-.107.336-.245.854-.26 1.333-.03.855.502 1.7.562 1.792.053.08.12.15.2.207.303.21.687.5.827.616.063.343.166 1.26.23 1.833.144 1.266.175 1.48.24 1.65.005.012.514 1.188 1.315 1.188.576-.003.673-.206 1.855-2.688.244-.512.45-.95.513-1.058.1-.144.597-.61.87-.83.55-.442.76-1.82.413-2.682-.335-.83-1.92-2.08-2.5-2.195-.17-.033-.43-.04-.953-.053-.497-.01-1.25-.028-1.536-.09-.098-.024-.314-.094-.605-.196.32-.668.627-1.28.71-1.4.05-.052.168-.112.408-.234.17-.086.383-.192.653-.34.208-.116.458-.247.71-.38 1.168-.612 1.484-.8 1.658-1.082.11-.177.263-.44-.04-1.544 1.042.027 2.038.24 2.955.61-.89.32-1.024.595-1.106.77-.367.784.256 1.475.667 1.93.096.107.24.268.32.38l-.017.036c-.234.472-.67 1.35-.196 2.194.406.72 1.384 1.13 2.437 1.52.134.05.25.092.33.126.16.208.496.79 1 1.735l.154.285c.078.14.33.505.842.505.167 0 .363-.04.59-.137.032-.013.083-.035.18-.094C19.72 17.405 16.22 20.5 12 20.5zm-3.812-9.45c.01-.285.102-.646.184-.907l.027.006c.397.09 1.037.11 1.83.13.32.006.59.008.615 0 .326.143 1.355 1 1.483 1.31.113.28.05.812-.034 1.01-.233.197-.845.735-1.085 1.078-.093.13-.212.373-.64 1.274-.133.276-.313.654-.488 1.013-.026-.225-.054-.472-.08-.686-.225-2.003-.273-2.22-.42-2.445-.05-.078-.202-.31-1.135-.973-.117-.213-.268-.564-.26-.813z"></path></g></svg><span>${languages.en.menu}</span>`,
}),
btNav = make("div","btNav", {
  id: "tetTW",
  role: "dialog",
  style: "z-index: -1 !important;",
  innerHTML: menu,
}),
content = '',
// Couldn't figure out how to make my own
// invalid_chars from https://greasyfork.org/scripts/423001
invalid_chars = {'\\': '＼', '/': '／', '|': '｜', '<': '＜', '>': '＞', ':': '：', '*': '＊', '?': '？', '"': '＂', '🔞': '', '#': ''},
elmFN = (sel) => {
  return new Promise((resolve) => {
    let txtFilter = sel.textContent.match(/[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}\p{Po}\p{So}\p{Sc}\d]/gu) || [];
    content = '';
    for(let key of txtFilter) {
      content += key.replace(/[\\/|<>*?:#"]/g, v => invalid_chars[v]);
    };
    resolve(encodeURIComponent(content));
  });
};
//#endregion
//#region Site n Menu Fn
/**
* Returns the cookie with the given name,
* or undefined if not found
* @source {@link https://javascript.info/cookie#getcookie-name}
*/
function getCookie(name) {
  let matches = doc.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : false;
};
function langChange(lchange) {
    tet.info("Updating language");
    let cfglng = TETConfig["lang"] ?? "en";
    if(lchange) {
      lng = {};
      cfglng = lchange ?? cfglng;
    };
    for(const key in languages) {
      if(key !== cfglng) continue;
      if(!Object.prototype.hasOwnProperty.call(lng, key)) {
        lng[key] = languages[key];
      } else if (key === "quest") {
        for (const key3 in languages[key]) {
          if(!Object.prototype.hasOwnProperty.call(lng[key], key3)) {
            lng[key][key3] = languages[key][key3];
          };
        };
      };
    };
    lng[cfglng]["ti"] = `${lng[cfglng]["t"]} + ${lng[cfglng]["i"]}`;
    tet.log("Language:",lng);
};
async function configDisplay() {
  let v = iconCache;
  return new Promise((resolve) => {
    let dis = TETConfig["display"],
    tra = TETConfig["translator"];
    if(!dis) throw new Error(`TETConfig["display"] is undefined ${dis}`);
    if(dis === "text + icon") {
      tra.match(/lingva/gi) ? resolve(`Lingva Translate ${v.lingva}`) :
      tra.match(/libre/gi) ? resolve(`LibreTranslate ${v.libre}`) :
      (tra == "bingIT") ? resolve(`Azure Cognitive Services ${v.azure}`) :
      (tra == "bing") ? resolve(`Bing ${v.bing}`) :
      (tra == "googleIT") ? resolve(`Google Cloud ${v.gCloud}`) :
      (tra == "google") ? resolve(`Google ${v.google}`) :
      tra.match(/mymemory/gi) ? resolve(`MyMemory ${v.mymemory}`) :
      tra.match(/translate/gi) ? resolve(`Translate.com ${v.translate}`) :
      tra.match(/yandex/gi) ? resolve(`Yandex ${v.yandex}`) : resolve(`DeepL ${v.deepl}`);
    } else if(dis === "icon") {
      tra.match(/lingva/gi) ? resolve(v.lingva) :
      tra.match(/libre/gi) ? resolve(v.libre) :
      (tra == "bingIT") ? resolve(v.azure) :
      (tra == "bing") ? resolve(v.bing) :
      (tra == "googleIT") ? resolve(v.gCloud) :
      (tra == "google") ? resolve(v.google) :
      tra.match(/mymemory/gi) ? resolve(v.mymemory) :
      tra.match(/translate/gi) ? resolve(v.translate) :
      tra.match(/yandex/gi) ? resolve(v.yandex) : resolve(v.deepl);
    } else {
      tra.match(/lingva/gi) ? resolve("Lingva Translate") :
      tra.match(/libre/gi) ? resolve("LibreTranslate") :
      (tra == "bingIT") ? resolve("Azure Cognitive Services") :
      (tra == "bing") ? resolve("Bing") :
      (tra == "googleIT") ? resolve("Google Cloud") :
      (tra == "google") ? resolve("Google") :
      tra.match(/mymemory/gi) ? resolve("MyMemory") :
      tra.match(/translate/gi)? resolve("Translate.com") :
      tra.match(/yandex/gi) ? resolve("Yandex") : resolve("DeepL");
    };
  }).then((display) => {
    let tw = lng[TETConfig["lang"] ?? "en"].tw;
    qs('#tetDemo').innerHTML = `${tw} ${display}`;
    if(!qs(".tet")) return;
    for(let t of qsA(".tet")) {
      t.innerHTML = `${tw} ${display}`;
    };
  }).catch((e) => err(e.message));
};
/** Src Element, Src Language, Src Content, Inject Mode */
function handleButton(source,src,content,mode) {
  mode = mode ?? "append";
  src = src ?? "auto";
  let tdStyle = 'align-items: end !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;',
  ntStyle = 'margin: 0px 0px 0px 58px !important; padding: .75em;',
  tetBtn = make("div",`tet ${cSub}`),
  btnDiv = make("div",`tetTextColor ${cText}`, {
    id: "tweet-text",
  }),
  btnSpan = make("span");
  btnDiv.append(btnSpan);
  ael(tetBtn,"mouseenter",e => e.target.classList.add("r-hover"));
  ael(tetBtn,"mouseleave",e => e.target.classList.remove("r-hover"));
  ael(tetBtn,"click", (e) => {
    tet.halt(e);
    let pretxt = e.target.innerHTML,
    tr = TETConfig["translator"],
    findTR = () => {
      return new Promise((resolve) => {
        if(tr.match(/IT|libre/gi)) {
          if(e.target.parentElement.contains(btnDiv)) {
            btnDiv.classList.toggle("rm");
            resolve("Already exists");
          } else {
            e.target.innerHTML = `[TET] ${lng[TETConfig["lang"]].l}...`;
            if(tr.match(/lingva/gi)) {
              resolve(fetchURL(`${TETConfig["url"]["lingva"]}/api/v1/${src}/${TETConfig["lang"]}/${content}`))
            } else if(tr.match(/libre/gi)) {
              resolve(fetchURL(TETConfig["url"]["libre"],"POST", {
                body: JSON.stringify({
                  q: content,
                  source: src,
                  target: TETConfig["lang"],
                  format: "text",
                  api_key: TETConfig["api"]["libre"]
                }),
              }))
            } else if(tr.match(/bing/gi)) {
              throw new Error("Work in progress");
            } else if(tr.match(/google/gi)) {
              resolve(fetchURL(`${TETConfig["url"][tr]}/language/translate/v2?q=${content}&target=${TETConfig["lang"]}&source=${src}&key=${TETConfig.api.google}`))
            } else if(tr.match(/mymemory/gi)) {
              resolve(fetchURL(`${TETConfig["url"][tr]}/get?q=${content}&langpair=${src}|${TETConfig["lang"]}`))
            } else if(tr.match(/translate/gi)) {
              resolve(fetchURL("https://api.translate.com/translate/v1/login","POST", {
                body: JSON.stringify({
                  email: src,
                  password: TETConfig["lang"]
                }),
              }).then(() => {
                fetchURL(TETConfig["url"][tr],"POST", {
                  body: JSON.stringify({
                    text: content,
                    source_language: src,
                    translation_language: TETConfig["lang"]
                  }),
                })
              }))
            } else if(tr.match(/yandex/gi)) {
              resolve(fetchURL(TETConfig["url"][tr],"POST", {
                body: JSON.stringify({
                  sourceLanguageCode: src,
                  targetLanguageCode: TETConfig["lang"],
                  format: "string",
                  texts: [content],
                  folderId: TETConfig["api"]["yandex"]
                }),
              }))
            } else if(tr.match(/deepl/gi)) {
              resolve(fetchURL(`https://${TETConfig["api"]["version"].match(/pro/gi) ? 'api' : 'api-free'}.deepl.com/v2/translate?auth_key=${TETConfig.api.deepl}&text=${content}&target_lang=${TETConfig["lang"]}`))
            } else {
              throw new Error("Unable to locate selected translator");
            };
          };
        } else {
          if(tr.match(/lingva/gi)) {
            resolve(`${TETConfig["url"][tr]}/${src}/${TETConfig["lang"]}/${content}`)
          }else if(tr.match(/bing/gi)) {
            resolve(`${TETConfig["url"][tr]}/translator/?text=${content}&from=${src}&to=${TETConfig["lang"]}`)
          } else if(tr.match(/google/gi)) {
            resolve(`${TETConfig["url"][tr]}/?q=${content}&sl=${src}&tl=${TETConfig["lang"]}`)
          } else if(tr.match(/mymemory/gi)) {
            resolve(`${TETConfig["url"][tr]}/${TETConfig["lang"]}/${src}/${TETConfig["lang"]}/${content}`)
          } else if(tr.match(/translate/gi)) {
            resolve(`${TETConfig["url"][tr]}/machine-translation#${src}/${TETConfig["lang"]}/${content}`)
          } else if(tr.match(/yandex/gi)) {
            resolve(`${TETConfig["url"][tr]}/?lang=${src}-${TETConfig["lang"]}&text=${content}`)
          } else if(tr.match(/deepl/gi)) {
            resolve(`${TETConfig["url"][tr]}/translator#${src}/${TETConfig["lang"]}/${content}`)
          } else {
            throw new Error("Unable to locate selected translator");
          };
        };
      })
    };
    findTR().then(r => {
      let find = () => {
        for (let k in r) {
          return k.includes("translation") ? r.translation :
          k.includes("responseData") ? r.responseData.translatedText :
          k.includes("data") ? (r.data.translations[0].translatedText ?? r.data.translation) :
          k.includes("translatedText") ? r.translatedText :
          k.includes("translations") ? r.translations[0].text : r;
        };
      };
      // tet.log(r);
      if(typeof r === "string") {
        if(r.match(/Already exists/gi)) return;
        e.target.innerHTML = pretxt;
        openPage(r);
      } else {
        btnSpan.innerHTML = find();
        if(!e.target.parentElement.contains(btnDiv)) {
          e.target.innerHTML = pretxt;
          e.target.after(btnDiv);
        };
      };
    }).catch((error) => {
      err(error.message);
      btnSpan.innerHTML += `---> ${error}`;
      if(!e.target.parentElement.contains(btnDiv)) e.target.after(btnDiv);
    });
  });
  (mode === "append") ? source.append(tetBtn) :
  (mode === "after") ? source.after(tetBtn) :
  (mode === "afterend") ? source.insertAdjacentHTML("afterend",tetBtn) :
  (mode === "before") ? source.before(tetBtn) :
  (mode === "prepend") ? source.prepend(tetBtn) :
  (mode === "tdTweet") ? (source.after(tetBtn),tetBtn.setAttribute("style",tdStyle)) :
  (mode === "tdBio") ? (source.after(tetBtn),tetBtn.setAttribute("style",`${tdStyle} padding-bottom: 4px !important;`)) :
  (mode === "nitter") ? (source.after(tetBtn),tetBtn.setAttribute("style",ntStyle),btnDiv.setAttribute("style",ntStyle)) : mode.prepend(tetBtn);
  configDisplay();
};

//#region Sites
const site = {
  nitter() {
    let twtFN = () => {
      for(let tc of qsA(".tweet-content")) {
        if(!tc.parentElement.parentElement.nextElementSibling || !tc.parentElement.parentElement.nextElementSibling.className.includes("tet")) {
          elmFN(tc).then(c => handleButton(tc.parentElement.parentElement,"auto",c,"nitter"));
        };
      };
    };
    (TETConfig["delay"] !== "none") ? delay(TETConfig["delay"]).then(() => twtFN()) : twtFN();
  },
  tweetdeck() {
    try {
      let twtFN = () => {
        for (let item of qsA("p.js-tweet-text")) {
          if(item.lang.includes(languages[TETConfig["lang"] ?? "en"]) && !item.nextElementSibling) continue;
          if(!item.nextElementSibling) continue;
          if(!item.nextElementSibling.className.includes("js-translate-call-to-action")) continue;
          if(!item.nextElementSibling.nextElementSibling) continue;
          if(item.nextElementSibling.nextElementSibling.className.includes("tet")) continue;
          handleButton(item.nextElementSibling,item.lang,item.innerText,"tdTweet");
        }
      };
      TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(()=>twtFN()) : twtFN();
    } catch (e) {err(e)};
  },
  twitlonger() {
    let content = qs('p#posttext').innerText,
    source = qs('.actions.text-right'),
    twtFN = () => {
      if(source && !qs('.tet')) {
        handleButton(source,"auto",content,"prepend");
      };
    };
    TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(() => twtFN()) : twtFN();
  },
  twitter() {
    let twtFN = () => {
      for(let e of qsA("div.css-18t94o4.r-6koalj.r-1w6e6rj.r-37j5jr.r-n6v787.r-16dba41.r-1cwl3u0.r-14gqq1x.r-bcqeeo.r-qvutc0")) { // "Translate Tweet/Bio"
        let tweetContainer = e.previousElementSibling;
        if(!e.nextElementSibling || !e.nextElementSibling.className.includes("tet")) {
          elmFN(tweetContainer).then((c) => {
            (!tweetContainer.lang || tweetContainer.lang === "") ? handleButton(tweetContainer.parentElement,"auto",c) : handleButton(tweetContainer.parentElement,tweetContainer.lang,c);
          });
        };
      }
    };
    TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(() => twtFN()) : twtFN();
  },
  async inject() {
    tet.info("Site:",lh);
    if(find.tweetdeck) {
      tet.query("section.js-column > div").then(()=>{
        tet.observe(qs(".js-modals-container"), (mutations) => {
          for(let mutation of mutations) {
            for(let node of mutation.addedNodes) {
              for(let elem of node.querySelectorAll('p[class*="prf-bio"]')) {
                let twtFN = () => {
                  if(elem && !elem.nextElementSibling.className.includes("tet")) {
                    handleButton(elem,"auto",elem.innerText,"tdBio");
                  };
                };
                TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(()=>twtFN()) : twtFN();
                break;
              }
            }
          }
        });
        let preElem = qs(".application").className;
        tet.observe(qs(".application"), (mutations) => {
          for(let mutation of mutations) {
            for(let node of mutation.addedNodes) {
              if (!(node instanceof HTMLElement)) continue;
              for(let elem of node.querySelectorAll('div[class*="tweet-detail"]')) {
                if(elem.className === preElem) continue;
                preElem = elem.className;
                delay(250).then(()=>this.tweetdeck());
                break;
              }
            }
          }
        });
      });
    };
    if(find.twitter) {
      tet.query("#react-root > div > div").then(() => {
        tet.query("main").then(() => {
          let preElement = qs("body"),
          preBio = qs("body"),
          prePath = doc.location.pathname,
          loTwitter = (elem) => {
            let twtFN = () => {
              elmFN(elem).then((c) => {
                (!elem.lang || elem.lang === "") ? handleButton(elem.parentElement,"auto",c) : handleButton(elem.parentElement,elem.lang,c);
              });
            };
            TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(() => twtFN()) : twtFN();
          };
          tet.observe(qs("body"), (mutations) => {
            for(let mutation of mutations) {
              for(let node of mutation.addedNodes) {
                if(!(node instanceof HTMLElement)) continue;
                if(find.logout) {
                  for(let elem of node.querySelectorAll('div.css-901oao')) {
                    if(!elem.dataset.testid) continue;
                    if(elem.dataset.testid.match(/tweetText/gi)) {
                      if(elem === preElement) continue;
                      preElement = elem;
                      loTwitter(elem);
                    };
                    if(elem.dataset.testid.match(/UserDescription/gi)) {
                      if(elem === preBio) continue;
                      preBio = elem;
                      loTwitter(elem);
                    };
                  };
                } else {
                  for(let elem of node.querySelectorAll('div.css-18t94o4.r-6koalj.r-1w6e6rj.r-37j5jr.r-n6v787.r-16dba41.r-1cwl3u0.r-14gqq1x.r-bcqeeo.r-qvutc0')) {
                    if(elem === preElement) continue;
                    preElement = elem;
                    delay(250).then(()=>this.twitter());
                  };
                  for(let elem of node.querySelectorAll('div[data-testid*="UserDescription"]')) {
                    if(elem === preBio) continue;
                    preBio = elem;
                    delay(250).then(()=>this.twitter());
                  };
                  if(node.matches('div[data-testid*="UserDescription"]')) {
                    if(node === preBio) continue;
                    preBio = node;
                    delay(250).then(()=>this.twitter());
                  };
                };
                for(let elem of node.querySelectorAll('div.r-nsbfu8 > .r-1s2bzr4 > div.css-901oao')) {
                  if(elem.classList.contains('tetInj')) continue;
                  if(elem.parentElement.contains(qs(".tet"))) continue;
                  elem.classList.add('tetInj');
                  let hoverFN = () => {
                    elmFN(elem).then(() => {
                      handleButton(elem.lastElementChild,"auto",content,"after");
                    });
                  };
                  delay(250).then(()=>{
                    TETConfig["delay"] !== "none" ? delay(TETConfig["delay"]).then(() => hoverFN()) : hoverFN()
                  });
                };
                let curPath = doc.location.pathname;
                if(curPath === prePath) continue;
                prePath = curPath;
                if(/logout|login|signin|signout|profile|keyboard_shortcuts|display|video|photo|compose/.test(doc.location.pathname)) {
                  tet.info("Hiding menu");
                  qs('#tetMenuButton').setAttribute('style', 'z-index: -1 !important;');
                } else {
                  qs('#tetMenuButton').setAttribute('style', '');
                };
              }
            }
          });
        });
      });
    };
    if(find.twitlonger) {
        tet.query("#postcontent").then(this.twitlonger())
    };
    let nitterObserver = () => {
      let bioFN = () => {
        if(!qs(".profile-bio").contains(qs(".tet"))) {
          elmFN(qs('div.profile-bio > p')).then(c => handleButton(qs('div.profile-bio > p').parentElement,"auto",c));
        };
      };
      tet.observe(qs("body"), (mutations) => {
        for(let mutation of mutations) {
          for(let node of mutation.addedNodes) {
            if(!(node instanceof HTMLElement)) continue;
            node.querySelectorAll('div.tweet-body').forEach(() => delay(250).then(()=>this.nitter()));
          };
        };
      });
      this.nitter();
      if(qs('div.profile-bio > p')) {(TETConfig["delay"] !== "none") ? delay(TETConfig["delay"]).then(() => bioFN()) : bioFN()};
    };
    if(TETConfig["nitterInstances"].length > 0) {
      tet.log("Finding Nitter instance...",TETConfig["nitterInstances"]);
      for(let key of TETConfig["nitterInstances"]) {
        let instance = key.url.slice(8);
        if(lh === instance) {
          nitterObserver();
          break;
        };
      }
    } else if(find.nitter) nitterObserver();
  },
};
//#endregion

async function Menu() {
  try {
    if(mobile) {
      tetMenuButton.classList.add("mobile");
      btNav.classList.add("mobile");
    };
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
      return await new Promise((resolve) =>  {
        if(find.twitter) {
          tet.query('body').then((sb) => {
            let bgColor = getComputedStyle(sb).getPropertyValue("background-color");
            (bgColor.includes("rgb(255, 255, 255)")) ? resolve("twdef") :
            (bgColor.includes("rgb(21, 32, 43)")) ? resolve("twdim") :
            (bgColor.includes("rgb(0, 0, 0)")) ? resolve("twlo") : resolve(bgColor);
          });
        } else if(find.tweetdeck) {
          cBG = "rgba(0, 0, 0, 0.4)";
          cText = "r-jwli3a";
          cHover = "r-hoverTD";
          cColor = "Button--primary";
          cSub = "tet-td";
          cTheme = "r-tetTD";
          resolve("tweetdeck");
        } else if(find.twitlonger) {
          cTheme = "r-14lw9ot",
          cBG = "rgba(0, 0, 0, 0.4)",
          cText = "r-18jsvk2";
          resolve("twdef");
        } else {
          cBG = "rgba(0, 0, 0, 0.4)";
          cTheme = "nitter";
          cText = "tetNTextColor";
          resolve("nitter");
        };
      })
    },
    autoColor = async () => {
      return await new Promise((resolve) =>  {
        if(find.twitter) {
          if(find.logout) {
            resolve("rgb(29, 155, 240)");
          } else {
            tet.query('a[href="/compose/tweet"]').then((sb) => {
              let bgColor = getComputedStyle(sb).getPropertyValue("background-color");
              (bgColor == "rgb(29, 155, 240)") ? resolve("tet-29u") :
              (bgColor == "rgb(255, 212, 0)") ? resolve("tet-255u") :
              (bgColor == "rgb(249, 24, 128)") ? resolve("tet-249u") :
              (bgColor == "rgb(120, 86, 255)") ? resolve("tet-120u") :
              (bgColor == "rgb(255, 122, 0)") ? resolve("tet-122u") :
              (bgColor == "rgb(0, 186, 124)") ? resolve("tet-186u") : resolve(bgColor);
            });
          };
        } else if(find.tweetdeck) {
          cHover = "r-hoverTD";
          cColor = "Button--primary";
          cSub = "tet-td";
          resolve("tweetdeck");
        } else if(find.twitlonger) {
          resolve("tet-29u");
        } else {
          cHover = "tetNitterHover";
          cColor = "tetNitter";
          cSub = "tetNText";
          resolve("nitter");
        };
      })
    };
    dlAPI.value = TETConfig["api"]["deepl"] ?? tet["defaultcfg"]["api"]["deepl"];
    libre[0].value = TETConfig["api"]["libre"] ?? tet["defaultcfg"]["api"]["libre"];
    libre[1].value = TETConfig["url"]["libre"] ?? tet["defaultcfg"]["url"]["libre"];
    lingva.value = TETConfig["url"]["lingva"] ?? tet["defaultcfg"]["lingva"];
    goAPI.value = TETConfig["api"]["google"] ?? tet["defaultcfg"]["api"]["google"];
    selAPI.value = TETConfig["api"]["version"];
    selLG.value = TETConfig["lang"] ?? "en";
    let v = lng[selLG.value ?? TETConfig["lang"] ?? "en"],s = doc.location.search;
    selCS.value = /auto/.test(TETConfig["colors"]) ? "auto" : TETConfig["colors"];
    if(selCS.value === "") selCS.value = "auto";
    selTH.value = /auto/.test(TETConfig["theme"]) ? "auto" : TETConfig["theme"];
    selTR.value = TETConfig["translator"];
    selDS.value = TETConfig["display"];
    selDI.value = TETConfig["delay"];
    qs("input#debug").checked = TETConfig["debug"];
    qs("input#sitetheme").checked = TETConfig["sitetheme"];
    qs(".tet-url").value = TETConfig["url"][selTR.value];
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
      for(let o of qsA('option[value="auto"]')) {o.innerText = v.ao};
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
    demoUpdate = txt => qs(".tet-demotext").innerText = txt,
    translatorSwap = (element) => {
      for(let i of qsA(".tetFields")) {
        if(i.classList.contains(element)) {
          i.setAttribute("style", "display: inline;");
        } else {
          i.setAttribute("style", "display: none;");
        };
      };
    },
    TETMenuUpdate = async (cSel,type) => {
      return await new Promise((resolve) =>  {
        if(type === "theme") {
          cTheme = "";
          cText = "";
          cBG = "";
          (cSel == "twdef") ? (cTheme = "r-14lw9ot",cBG = "rgba(0, 0, 0, 0.4)",cText = "r-18jsvk2") :
          (cSel == "twdim") ? (cTheme = "r-yfoy6g",cBG = "rgba(91, 112, 131, 0.4)",cText = "r-jwli3a") :
          (cSel == "nitter") ? (cTheme = "nitter",cBG = "rgba(0, 0, 0, 0.4)",cText = "tetNTextColor") :
          (cSel == "btd") ? (cTheme = "r-tetBTD",cBG = "rgba(0, 0, 0, 0.4)",cText = "r-jwli3a") :
          (cSel == "tweetdeck") ? (cTheme = "r-tetTD",cBG = "rgba(0, 0, 0, 0.4)",cText = "r-jwli3a") : (
            cTheme = "r-kemksi",
            cBG = "rgba(91, 112, 131, 0.4)",
            cText = "r-jwli3a");
          resolve();
        } else if(type === "colors") {
          cHover = "";
          cColor = "";
          cSub = "";
          resolve((cSel == "tet-29u") ? (cHover = "r-1q3imqu",cColor = "r-p1n3y5 r-1bih22f",cSub = "r-13gxpu9") :
          (cSel == "nitter") ? (cHover = "tetNitterHover",cColor = "tetNitter",cSub = "tetNText") :
          (cSel == "btd") ? (cHover = "r-hoverTD",cColor = "Button--primary",cSub = "tet-btd") :
          (cSel == "tweetdeck") ? (cHover = "r-hoverTD",cColor = "Button--primary",cSub = "tet-td") :
          (cSel == "tet-255u") ? (cHover = "r-1kplyi6",cColor = "r-v6khid r-cdj8wb",cSub = "r-61mi1v") :
          (cSel == "tet-249u") ? (cHover = "r-1ucxkr8",cColor = "r-1iofnty r-jd07pc",cSub = "r-daml9f") :
          (cSel == "tet-120u") ? (cHover = "r-njt2r9",cColor = "r-hy56xe r-11mmphe",cSub = "r-xfsgu1") :
          (cSel == "tet-122u") ? (cHover = "tet-122hu",cColor = "r-1xl5njo r-b8m25f",cSub = "r-1qkqhnw") :
          (cSel == "tet-186u") ? (cHover = "r-zx61xx",cColor = "r-5ctkeg r-1cqwhho",cSub = "r-nw8l94") : (
            cHover = "r-1q3imqu",
            cColor = "r-p1n3y5 r-1bih22f",
            cSub = "r-13gxpu9"));
        } else if (type == "translator") {
          qs('.tet-url').setAttribute("style", "display: inline;");
          resolve((cSel == "bingIT") ? translatorSwap("bing") :
          (cSel == "googleIT") ? translatorSwap("google") :
          (cSel == "deeplIT") ? translatorSwap("deepl") :
          (cSel == "translateIT") ? (translatorSwap("translate"),qs('.tet-url').setAttribute("style", "display: none;")) :
          (cSel == "yandexIT") ? (translatorSwap("yandex"),qs('.tet-url').setAttribute("style", "display: none;")) :
          (cSel == "libre") ? (translatorSwap("libre"),qs('.tet-url').setAttribute("style", "display: none;")) :
          (cSel == "lingva" || cSel == "lingvaIT") ? (translatorSwap("lingva"),qs('.tet-url').setAttribute("style", "display: none;")) : translatorSwap("all"));
        };
      });
    },
    tetAdmin = () => {
      tet.log(s);
      if(s.match(/tetopen/gi)) {
        nav.classList.remove("rm");
        qs('#tetForm').classList.remove("rm");
        qs('.tet-icon-container').classList.remove("rm");
        qs('.tetadvanced-icon-container').classList.remove("rm");
        btNav.setAttribute('style', 'z-index: 10000 !important');
        tetMenuButton.classList.toggle("mini");
        document.documentElement.classList.add("tetFreeze");
      };
    };
    if(s) tetAdmin();
    //#region Nitter/TweetDeck/Twitlonger
    if(find.twitter) {
      let link = "https://abs.twimg.com/favicons/twitter.ico";
      qs(".tetAvatarFrame").innerHTML = `<div id="tetAvatar" style="background-image: url(${link}) !important;"></div>`;
    } else {
      tet.loadCSS(twCSS, "foreign");
      qs(".tetst").classList.remove("rm");
      if(TETConfig["nitterInstances"].length > 0) {
        tet.log("Finding Nitter instance...",TETConfig["nitterInstances"]);
        for (let key of TETConfig["nitterInstances"]) {
          let instance = key.url.slice(8);
          if(lh === instance) {
            btNav.setAttribute("id", "tetNT");
            tet.query('link[rel="icon"]').then((l) => {
              qs(".tetAvatarFrame").innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
            });
            break;
          };
        }
      } else if(find.nitter) {
        btNav.setAttribute("id","tetNT");
        tet.query('link[rel="icon"]').then((l) => {
          qs(".tetAvatarFrame").innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      };
      if(find.twitlonger) {
        tet.query('link[rel="shortcut icon"]').then((l) => {
          qs(".tetAvatarFrame").innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      };
      if(find.tweetdeck) {
        tetMenuButton.classList.add("tetTD");
        tet.query('link[rel="shortcut icon"]').then((l) => {
          qs(".tetAvatarFrame").innerHTML = `<div id="tetAvatar" style="background-image: url(${l.href}) !important;"></div>`;
        });
      };
      if(TETConfig["sitetheme"]) {
        if(find.tweetdeck) {
          btNav.setAttribute("id","tetBTD");
          tet.query("body.btd-loaded").then(() => tet.loadCSS(nitterCSS, "nitter"));
        } else {
          tet.loadCSS(nitterCSS, "nitter");
        };
      };
    };
    //#endregion
    nav.setAttribute("style",`background-color:${cBG}`);
    TETMenuUpdate(selTR.value,"translator");
    autoTheme().then((theme) => {
      let aTheme = /auto/.test(selTH.value) ? theme : selTH.value;
      TETMenuUpdate(aTheme,"theme").then(() => {
        for(let i of qsA(".tetBackground")) {
          i.classList.remove(theme);
          i.classList.remove(cTheme);
          i.classList.add(cTheme);
        };
        for(let i of qsA(".tetTextColor")) {
          i.classList.remove(cText);
          i.classList.add(cText);
        };
      });
    });
    autoColor().then((color) => {
      TETConfig["colors"] = /auto/.test(selCS.value) ? color : selCS.value;
      TETMenuUpdate(TETConfig["colors"],"colors").then(() => {
        tet.query(".tetDisplayColor").then(() => {
          for(let i of qsA(".tetDisplayColor")) {
            i.classList.remove(color);
            i.classList.remove(TETConfig["colors"]);
            i.classList.add(TETConfig["colors"]);
          };
          for(let i of qsA(".tetSub")) {
            i.classList.remove(cSub);
            i.classList.add(cSub);
          };
          TETConfig["colors"] = /auto/.test(selCS.value) ? "auto" : selCS.value;
        });
      });
    });
    if(qs(".tet")) {
      for(let i of qsA(".tet")) {
        i.classList.remove(cSub);
        i.classList.add(cSub);
      };
    };
    ael(nav,"click",(e) => {
      !tetAlert.classList.contains("rm") ? tetAlert.classList.add("rm") : false;
      !qs("#tetadvanced").classList.contains("rm") ? qs("#tetadvanced").classList.add("rm") : false;
      document.documentElement.classList.remove("tetFreeze");
      qs(".tet-help-container").classList.add("rm");
      qs('#tetForm').classList.add("rm");
      qs('.tet-icon-container').classList.add("rm");
      qs('.tetadvanced-icon-container').classList.add("rm");
      btNav.setAttribute('style', 'z-index: -1 !important;');
      qs('svg#tetSVG').setAttribute("style", "display: inline;");
      if(!tetMenuButton.classList.contains("mobile")) {
        tetMenuButton.setAttribute("style", "");
        tetMenuButton.classList.add("mini");
      };
      e.target.classList.remove("warn");
      e.target.classList.add("rm");
      (selLG.value !== "en" ?? dLng !== "en") ? demoUpdate("Hey look I'm a foreign language.") : demoUpdate(defaultDesc);
      TETConfig["api"]["google"] = goAPI.value;
      TETConfig["api"]["deepl"] = dlAPI.value;
      TETConfig["api"]["libre"] = libre[0].value;
      TETConfig["api"]["yandex"] = qs('input[type="password"].yandex').value;
      TETConfig["url"]["libre"] = libre[1].value;
      TETConfig["url"]["lingva"] = lingva.value;
      TETConfig["url"][selTR.value] = qs(".tet-url").value;
      TETConfig["colors"] = selCS.value;
      TETConfig["theme"] = selTH.value;
      tet.save();
      delay(5000).then(() => qs('svg#tetSVG').setAttribute("style", "display: none;"));
    });
    ael(tetMenuButton,"click", (e) => {
      nav.classList.remove("rm");
      qs('#tetForm').classList.remove("rm");
      qs('.tet-icon-container').classList.remove("rm");
      qs('.tetadvanced-icon-container').classList.remove("rm");
      btNav.setAttribute('style', 'z-index: 10000 !important');
      e.target.classList.toggle("mini");
      document.documentElement.classList.add("tetFreeze");
    });
    mouseEvents('div#tetSelector',(e) => {
      tet.halt(e);
      let sColors = cColor.match(/[A-Za-z0-9_.]+-[A-Za-z0-9_.]+/gi) ?? [cColor],
      sSubs = cSub.match(/[A-Za-z0-9_.]+-[A-Za-z0-9_.]+/gi) ?? [cSub];
      for(let i of sColors) {
        if(e.target.classList.contains(i)) {
          e.target.classList.remove(i);
        } else {
          e.target.classList.add(i);
        };
      };
      for(let i of sSubs) {
        if(e.target.children[0].classList.contains(i)) {
          e.target.children[0].classList.remove(i);
        } else {
          e.target.children[0].classList.add(i);
        };
      };
    });
    ael(tetMenuButton,"mouseenter", (e) => {
      e.target.classList.toggle(cHover,TETConfig["colors"]);
      qs('svg#tetSVG').setAttribute("style", "display: none;");
      e.target.classList.toggle("mini");
    });
    ael(tetMenuButton,"mouseleave", (e) => {
      e.target.classList.toggle(cHover,TETConfig["colors"]);
      qs('svg#tetSVG').setAttribute("style", "display: inline;");
      e.target.classList.toggle("mini");
      delay(5000).then(() => qs('svg#tetSVG').setAttribute("style", "display: none;"));
    });
    ael(selTH,"change", (e) => {
      let cSel = e.target.value;
      for(let i of qsA(".tetDisplayColor")) i.classList.remove(TETConfig["colors"]);
      for(let i of qsA(".tetBackground")) i.classList.remove(cTheme);
      for(let i of qsA(".tetTextColor")) i.classList.remove(cText);
      autoTheme().then((theme) => {
        let aTheme = /auto/.test(cSel) ? theme : cSel;
        TETMenuUpdate(aTheme,"theme").then(() => {
          for(let i of qsA(".tetBackground")) i.classList.add(cTheme);
          for(let i of qsA(".tetTextColor")) i.classList.add(cText);
          for(let i of qsA(".tetDisplayColor")) i.classList.add(TETConfig["colors"]);
        });
      });
    });
    ael(selCS,"change", (e) => {
      let cSel = e.target.value;
      for(let i of qsA(".tetDisplayColor")) {
        i.classList.remove(TETConfig["colors"]);
        i.classList.remove(selCS.value);
      };
      for(let i of qsA(".tetSub")) i.classList.remove(cSub);
      if(qs(".tet")) for(let i of qsA(".tet")) i.classList.remove(cSub);
      autoColor().then((color) => {
        TETConfig["colors"] = /auto/.test(cSel) ? color : cSel;
        TETMenuUpdate(TETConfig["colors"],"colors").then(() => {
          tet.query(".tetDisplayColor").then(() => {
            for(let i of qsA(".tetDisplayColor")) i.classList.add(TETConfig["colors"]);
            for(let i of qsA(".tetSub")) i.classList.add(cSub);
            if(qs(".tet")) for(let i of qsA(".tet")) i.classList.add(cSub);
            TETConfig["colors"] = /auto/.test(cSel) ? "auto" : cSel;
          });
        });
      });
    });
    ael(selLG,"change", (e) => {
      TETConfig["lang"] = e.target.value;
      langChange(e.target.value);
      TETLanguageChange(e.target.value);
    });
    ael(selTR,"change", (e) => {
      let cSel = e.target.value;
      TETConfig["translator"] = cSel;
      if(cSel === "deeplIT") {
        qs(".tet-url").value = `https://${(selAPI.value == "api-pro") ? 'api' : 'api-free'}.deepl.com`;
      } else {
        qs(".tet-url").value = TETConfig["url"][cSel];
      };
      TETMenuUpdate(cSel,"translator");
      configDisplay();
    });
    ael(selDS,"change", (e) => {
      TETConfig["display"] = e.target.value;
      configDisplay();
    });
    ael(selAPI,"change", (e) => {
      TETConfig["api"]["google"] = goAPI.value;
      TETConfig["api"]["deepl"] = dlAPI.value;
      TETConfig["api"]["libre"] = libre[0].value;
      TETConfig["api"]["yandex"] = qs('input[type="password"].yandex').value;
      TETConfig["url"]["libre"] = libre[1].value;
      TETConfig["url"]["lingva"] = lingva.value;
      TETConfig["api"]["version"] = e.target.value;
      if(selTR.value === "deeplIT") {
        qs(".tet-url").value = `https://${(e.target.value == "api-pro") ? 'api' : 'api-free'}.deepl.com`;
      } else {
        qs(".tet-url").value = TETConfig["url"][selTR.value];
      };
    });
    ael(selDI,"change", e => TETConfig["delay"] = e.target.value);
    ael(qs("input#debug"),"change", e => TETConfig["debug"] = e.target.checked);
    ael(qs("input#sitetheme"),"change", e => TETConfig["sitetheme"] = e.target.checked);
    ael(qs('#tetReset'),"click", () => {
      tetAlert.classList.remove("rm");
      nav.classList.add("warn");
    });
    ael(qs('.tetAlertBtns.confirm'),"click", () => {
      localStorage.removeItem("TETConfig");
      TETConfig = tet.defaultcfg;
      tet.save();
      delay(250).then(() => doc.location.reload());
    });
    ael(qs('.tetAlertBtns.deny'),"click", () => {
      tetAlert.classList.add("rm");
      nav.classList.remove("warn");
    });
    ael(qs(".tet-icon-info"),"click", () => {
      !qs("#tetadvanced").classList.contains("rm") ? qs("#tetadvanced").classList.add("rm") : false;
      qs(".tet-help-container").classList.toggle("rm");
    });
    ael(qs(".tetadvanced-icon-container"),"click", () => {
      qs(".tet-help-container").classList.add("rm");
      qs("#tetadvanced").classList.toggle("rm");
    });
    ael(qs("#tetNI"),"click", (e) => {
      let pretxt = e.target.innerHTML;
      TETConfig["nitterInstances"] = [];
      e.target.innerHTML = `[TET] ${lng[TETConfig["lang"]].l}...`;
      fetchURL(`${ghCDN}/xnaas/nitter-instances/.upptimerc.yml`,"GET","text").then((str) => {
        let nURL = str.match(/ url: https:\/\/[a-zA-Z0-9].+/gi);
        if(nURL) {
          for(let i of nURL) {
            for(let n of i.split("url: ")) {
              let url = n.match(/https:\/\/[a-zA-Z0-9].+/gi);
              if(!url) continue;
              TETConfig["nitterInstances"].push({url},);
            };
          };
        };
        console.groupCollapsed('[%cTET%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 108, 96);', "Nitter Instances");
        for(let i of TETConfig["nitterInstances"]) {
          let n = i.url;
          console.log(`// @match        ${n}`);
        };
        console.groupEnd();
        e.target.innerHTML = "Open browsers dev tools to view list";
        tet.save();
        delay(5000).then(() => {
          e.target.innerHTML = pretxt;
        });

      });
    });
    TETLanguageChange();
    delay(5000).then(() => qs('svg#tetSVG').setAttribute("style", "display: none;"));
    tet.info("Menu injection complete");
  } catch (e) {
    err(e);
  }
};
//#region Initialize Userscript

async function setupConfig() {
  await Promise.all([TM.getValue('Config',JSON.stringify(tet.defaultcfg))]).then((data) => {
    tet.loadCSS(tetCSS,'core');
    TETConfig = JSON.parse(localStorage.getItem('TETConfig') ?? data[0]);
    for (const key in tet.defaultcfg) {
      if(!Object.prototype.hasOwnProperty.call(TETConfig, key)) {
        TETConfig[key] = tet.defaultcfg[key];
      } else if (key === "api") {
        for (const key2 in tet.defaultcfg[key]) {
          if(!Object.prototype.hasOwnProperty.call(TETConfig[key], key2)) {
            TETConfig[key][key2] = tet.defaultcfg[key][key2];
          };
        };
      } else if (key === "url") {
        for (const key3 in tet.defaultcfg[key]) {
          if(!Object.prototype.hasOwnProperty.call(TETConfig[key], key3)) {
            TETConfig[key][key3] = tet.defaultcfg[key][key3];
          };
        };
      };
    };
    tet.info('Presetup complete + config loaded');
    tet.log('Config:',TETConfig);
    let s = doc.location.search;
    if(s) {
      if(s.match(/tetdebug/gi)) {
        TETConfig["debug"] = true;
        tet.save();
      };
      if(s.match(/tetrestore/gi)) {
        localStorage.removeItem("TETConfig");
        TETConfig = tet.defaultcfg;
        tet.save();
      };
    };
    lngFN();
    langChange();
    tet.info('Starting Menu injection');
    Menu();
    tet.info('Starting content script injection');
    site.inject();
  }).catch(e => {
    err(e);
  });
};

async function preSetup() {
  return await new Promise((resolve) => {
    if(find.twitter) {
      if(doc.location.pathname === "/" && find.logout) throw new Error("Must be login, canceling...");
      if(find.remover) throw new Error("In blacklisted page, canceling...");
    };
    if(find.tweetdeck && find.logout) throw new Error("Must be login, canceling...");
    iconData.fn().then((icons) => {
      iconCache = icons;
      resolve(setupConfig());
    });
  }).catch(e => err(e));
};

preSetup();

//#endregion

})();
