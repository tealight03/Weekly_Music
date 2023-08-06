#!/usr/bin/node

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/main.html');
});

app.get('/:name', (req, res) => {
    res.sendFile(__dirname + '/html/'+req.params.name+'.html');
});

app.get('/css/:name', (req, res) => {
    res.sendFile(__dirname + '/css/'+req.params.name);
});

app.get('/js/:name', (req, res) => {
    res.sendFile(__dirname + '/js/'+req.params.name);
});

app.get('/images/:name', (req, res) => {
    res.sendFile(__dirname + '/images/'+req.params.name);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});