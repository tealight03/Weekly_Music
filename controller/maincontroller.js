const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log(req.session);
    res.sendFile(path.join(__dirname, '../html/main.html'));
});

router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/menu.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/login.html'));
});

router.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/search.html'));
});

router.get('/mypage', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/mypage.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/signup.html'));
});

router.get('/track', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/track.html'));
});

router.get('/css/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../css/', req.params.name));
});

router.get('/js/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/', req.params.name));
});

router.get('/images/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../images/', req.params.name));
});

router.get('/music/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../music/', req.params.name));
});

module.exports = router;