# Twitter External Translator

> Adds a "Translate with ..." button to Tweets and User Bios.

*This was a fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
Stable | [Install](#install-area) | [Install [GitHub]](https://github.com/magicoflolis/twitter-translator/releases/latest/download/twittertranslator.user.js) | Recommended version.
Legacy | - | [Install [GitHub]](https://github.com/magicoflolis/twitter-translator/raw/master/dist/twittertranslatorlegacy.user.js) | For incompatibility issues.

***

| Preview |
|:----------:|
![Menu Preview](https://raw.githubusercontent.com/magicoflolis/twitter-translator/master/assets/ExternalTranslator.gif)|

## Changelog

> [(GitHub) Full Changelog](https://github.com/magicoflolis/twitter-translator/releases)

## Features

> The menu and CSS have been compressed to reduce file size. Comments can be found under `src/main.js` on GitHub.

* [ Script ] Support for External & Internal Translators!
* [ Menu ] Config Menu!
* [ Menu ] Multiple language support!
* [ Menu ] Support for matching Twitter colors
* [ Menu ] Support for matching Twitter theme
* [ Site ] Support for [TwitLonger](https://www.twitlonger.com)
* [ Site ] Support for [TweetDeck](https://tweetdeck.twitter.com)
* [ Site ] Support for every [Nitter](https://github.com/zedeus/nitter/wiki/Instances#official-instances)
* [ Script ] Now works while logged out!
* [ Script ] Added "Restore to Defaults" button.
* [ Site ] Added mobile.twitter.com
* [ Menu ] Will automatically default to current sites theme.
* [ Menu ] Will automatically select the current language of the site.
* Each [ WIP ] is functional.
* [ WIP ] Every theme can be applied to any site!
* [ WIP ] Added help for each menu item.
* [ WIP ] Reworked the menus CSS.

### Supported

Translator | External | Website | Internal |
:---------:|:-----------:|:-----------:|:---------:|
Bing Microsoft Translator | ✅ |[link](https://www.bing.com/translator)| ❌ |
DeepL Translate | ✅ |[link](https://www.deepl.com/translator)| ✅ |
Google Translate | ✅ |[link](https://translate.google.com/)| ✅ |
LibreTranslate | ❌ |[link](https://libretranslate.com/)| ✅ |
Lingva Translate | ✅ |[link](https://lingva.ml/)| ✅ |
MyMemory | ✅ |[link](https://mymemory.translated.net/)| ✅ |
Translate.com | ✅ |[link](https://www.translate.com/)| ❌ |
Yandex Translate | ✅ |[link](https://translate.yandex.com/)| ❌ |

## Documentation

* [(GitHub) Wiki](https://github.com/magicoflolis/twitter-translator/wiki)

## Bugs / Issues

* [ User Script ] *May* conflict with [Magic Userscript+ : Show Site All UserJS](https://greasyfork.org/scripts/421603).
* [ Script ] *Sometimes* "Translate tweet" won't appear on Twitter. (Clicking a picture and opening the right sidebar to view the Tweet & Replies)
* [ Translator ] MyMemory API doesn't work in Bios.
* [ Menu ] Cannot be moved or disabled. ( WIP )

**Footnotes:**

* [ Translator ] Twitters built-in translation uses Google Translate, TweetDeck uses Bing Microsoft Translator.
* [ TweetDeck ] Only appears in one column.
* [ Translator ] Yandex Translate may default to Russian.
![YandexHelp](https://raw.githubusercontent.com/magicoflolis/twitter-translator/master/assets/ExternalTranslator4.gif)

## Source Code

[https://github.com/magicoflolis/twitter-translator](https://github.com/magicoflolis/twitter-translator)

## Contacts

* [GitHub](https://github.com/magicoflolis)
* [Twitter](https://twitter.com/for_lollipops)
* [Greasy Fork](https://greasyfork.org/users/166061)

## Roadmap

* Fix any bugs along the way.
* Automatically match Twitter colors.
* Show multiple translators at once.
* Show multiple on TweetDeck.
* Support for direct messages.
* Support more translators.
