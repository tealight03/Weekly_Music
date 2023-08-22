const express = require('express');
const router = express.Router();

var model = require('../model/model.js');

router.get('/', (req, res) => {
    res.send('API root');
});

router.get('/getUinfo', model.getUinfo);
router.get('/getPlaylist', model.getPlaylist);
router.get('/getMusic', model.getMusic);
router.get('/getRecMusic', model.getRecMusic);

router.post('/signup', model.signup);

module.exports = router;