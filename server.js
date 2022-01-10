const express = require('express');
const mysql = require('mysql');
const url = require('url');
const text = require('./lang.json');

let lang = "esp";

const versionsList = require('./modules/VersionsList');
const getAbsUrl = require('./modules/GetAbsUrl');
const sqlQueries = require('./modules/SQLQueries');

const app = express();

const dbConfig = process.env.DATABASE_URI;
let connection;

const server = (LANG,PORT) => {
    lang = LANG;
    app.listen(PORT, () => console.log(`${text.server.listening[lang]}: ${PORT}`));
    connection = mysql.createConnection(dbConfig);
};

const versions = ["v1"];

const setLang = (l) => { if (l === "esp" || l === "eng") { lang = l } };
const getUrlQueries = (req) => { return url.parse(req.url,true).query };
const queryLang = (r) => setLang(getUrlQueries(r).lang);

app.get('/', (req,res) => {
    queryLang(req);

    res.status(200);
    res.json(versionsList(versions,getAbsUrl(req,res),text.routes.versions[lang]));
});

// API v1

app.get('/v1/all', async(req,res) => {
    queryLang(req);

    connection.query(sqlQueries.all, (error, results, fields) => {
        if (error) {
            res.status(500);
            res.json({ "error": text.db.error[lang] })
        };

        res.json(results)

        connection.end();
    });

});

module.exports = { server };
