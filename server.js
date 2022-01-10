const express = require('express');
const mysql = require('mysql');
const url = require('url');
const text = require('./lang.json');

let lang = "esp";

const versionsList = require('./modules/VersionsList');
const getAbsUrl = require('./modules/GetAbsUrl');

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

    const SQLQuery = `SELECT category.name AS category, p.id AS id, p.name AS name, p.url_image AS img, p.price AS price, p.discount AS off FROM product AS p JOIN category ON p.category = category.id;`;
    
    connection.query(SQLQuery, (error, results, fields) => {
        if (error) throw error;
        res.json(results)
        connection.end();
    });

});

module.exports = { server };
