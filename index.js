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

const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

//controller 연결
var maincontroller = require('./controller/maincontroller.js');
var apicontroller = require('./controller/apicontroller.js');

app.use('/', maincontroller);
app.use('/api', apicontroller);

// 로그인 
app.post('/login', (req, res) => {
    const { id, pw } = req.body;

    const crypto = require('crypto');
    const hashpw = crypto.createHash('sha256').update(pw).digest('hex'); 

    const sql = 'SELECT * FROM user WHERE userid = ? AND userpw = ?';
    connection.query(sql, [id, hashpw], (err, result) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
      }
  
      if (result.length > 0) {
        req.session.user = result[0];
        res.setHeader('Set-Cookie', 'user=' + req.body.id);
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    });
  });

// 로그아웃
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