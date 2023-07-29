const express = require('express');
//const mysql = require('mysql');
//const dbconfig = require('./config/dbinfo.js');
//const connection = mysql.createConnection(dbconfig);
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/main.html');
});

app.get('/images/:name', (req, res) => {
    res.sendFile(__dirname + '/images/'+req.params.name);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});