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

//controller 연결
var maincontroller = require('./controller/maincontroller.js');
var apicontroller = require('./controller/apicontroller.js');

app.use('/', maincontroller);
app.use('/api', apicontroller);


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

// listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});