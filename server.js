const express = require('express');
const url = require('url');

const app = express();

const text = require('./lang.json'); let lang;

const server = (LANG,PORT) => {
    lang = LANG;
    app.listen(PORT, () => console.log(`${text.server.listening[lang]}: ${PORT}`));
}

module.exports = { server };
