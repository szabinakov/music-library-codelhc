const express = require('express');

const artistController = require('../controllers/artist.js');
const router = express.Router();

router.post('/', artistController.createArtist)

module.exports = router;