const beautify = require('js-beautify').js,
fs = require("fs");


fs.readFile("./dist/twittertranslator.dev.user.js", 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  beautify(data, { indent_size: 2, space_in_empty_paren: true });
});