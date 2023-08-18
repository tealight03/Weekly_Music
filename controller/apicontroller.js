const express = require('express');
const router = express.Router();

var model = require('../model/model.js');

router.get('/', (req, res) => {
    res.send('API root');
});

router.get('/getUinfo', model.getUinfo);
router.get('/getPlaylist', model.getPlaylist);

module.exports = router;