const { server } = require('./server.js');

const LANG = process.env.LANGUAGE || "esp";
const PORT = process.env.PORT || 3000;

server(LANG,PORT);
