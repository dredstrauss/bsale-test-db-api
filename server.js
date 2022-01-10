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

app.get('/v1', (req,res) => {
    queryLang(req);
    let list = {};
    list[text.db.all[lang]] = getAbsUrl(req) + 'all';

    connection = mysql.createConnection(dbConfig);
    connection.query(sqlQueries.categories, (error,results) => {
        if (error) {
            res.status(500);
            res.json({ "error": text.db.error[lang] })
        } else {
            for (key in results) {
                const name = results[key].name.replace(/\s/g, '%20');
                list[results[key].name] = getAbsUrl(req) + name;
            }
            res.status(200);
            res.json(list);
        }
        connection.end();
    })

});

app.get('/v1/:cat', (req,res) => {
    queryLang(req);
    let sqlQuery = sqlQueries.all;
    const urlQueries = url.parse(req.url,true).query;

    if (req.params.cat !== 'all') { sqlQuery = sqlQueries.category(req.params.cat) };

    connection = mysql.createConnection(dbConfig);
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500);
            res.json({ "error": text.db.error[lang] })
        } else if (Object.keys(results).length === 0) {
            res.status(400)
            res.json( { "error": text.db.noRes[lang] } );
        } else {
            res.status(200)
            res.json(results)
        }

        connection.end();
    });

});

module.exports = { server };
