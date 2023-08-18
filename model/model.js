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