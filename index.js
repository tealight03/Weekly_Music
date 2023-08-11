#!/usr/bin/node

const express = require('express');
const path = require('path');
const cors = require('cors');
const { createConnection } = require('net');

const app = express();
const port = 3000;

app.use(
    cors({
        origin: ['https://ymin.store', 'https://www.weeklymusic.store'],
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/main.html');
});

app.get('/api', (req, res) => {
    connection.query('SELECT * FROM user', (error, rows) => {
        if (error) throw error;
        res.send(rows);
    })
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