const express = require('express');
const url = require('url');
const text = require('./lang.json');

let lang = "esp";
const setLang = (l) => { if (l === "esp" || l === "eng") { lang = lg } };

const versionsList = require('./modules/VersionsList');
const getAbsUrl = require('./modules/GetAbsUrl');

const app = express();
const server = (LANG,PORT) => {
    lang = LANG;
    app.listen(PORT, () => console.log(`${text.server.listening[lang]}: ${PORT}`));
};

const versions = ["v1"];

app.get('/', (req,res) => {
    let queries = url.parse(req.url,true).query;
    setLang(queries.lang);

    res.status(200);
    res.json(versionsList(versions,getAbsUrl(req,res),text.routes.versions[lang]));
});

module.exports = { server };
