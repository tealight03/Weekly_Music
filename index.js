#!/usr/bin/node

const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(
    cors({
        origin: ['https://ymin.store', 'https://www.weeklymusic.store'],
        credentials: true,
    })
);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: 'g7$In!2@S#%9Oc$5mB',
        resave: true,
        saveUninitialized: true
    })
);

const { createConnection } = require('net');


app.get('/', (req, res) => {
    console.log(req.session);
    res.sendFile(__dirname + '/html/main.html');
});

// 로그인 
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
});

app.post('/login', (req, res) => {
    if (req.session.user ? req.session.user.id == 'test' : false) {
        res.redirect('/');
    }
    else if(req.body.id == 'test' && req.body.pw == '1234') {
        req.session.user = {
            id: req.body.id,
        };

        res.setHeader('Set-Cookie', ['user=' + req.body.id]);
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.clearCookie('user');
            res.redirect('/');
        }
    });
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

app.get('/music/:name', (req, res) => {
    res.sendFile(__dirname + '/music/'+req.params.name);
});

// listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});