const mysql = require('mysql');
const dbconfig = require('../config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

exports.getUinfo = (req, res) => {
    var sql = 'SELECT * FROM user';
    connection.query(sql, (error, row) => {
        if(error) throw error;
        res.send(row);
    });
};

exports.getPlaylist = (req, res) => {
    var sql = 'SELECT * FROM playlist, music WHERE music_idmusic = idmusic';
    connection.query(sql, (error, row) => {
        if(error) throw error;
        res.send(row);
    });
};

exports.getMusic = (req, res) => {
    var sql = 'SELECT * FROM music';
    connection.query(sql, (error, row) => {
        if(error) throw error;
        res.send(row);
    })
}

exports.signup = (req, res) => {
    const { id, pw, email, tel } = req.body;

    const crypto = require('crypto');
    const hashpw = crypto.createHash('sha256').update(pw).digest('hex');
    
    var sql = 'INSERT INTO user (userid, userpw, email, tel) VALUES (?, ?, ?, ?)';
    connection.query(sql, [id, hashpw, email, tel], (error, result) => {
        if (error) throw error;
        if (result.affectedRows > 0) {
            return res.redirect('/login');
        } else {
            alert("계정 생성 실패");
            return res.redirect('/signup');
        }
    });
}

exports.getRecMusic = (req, res) => {
    var sql = 'SELECT * FROM music WHERE music_singer = "BTS"';
    connection.query(sql, (error, row) => {
        if(error) throw error;
        res.send(row);
    })
}

exports.getTodayMusic = (req, res) => {
    var sql = 'SELECT * FROM music WHERE idmusic < 6';
    connection.query(sql, (error, row) => {
        if(error) throw error;
        res.send(row);
    })
}