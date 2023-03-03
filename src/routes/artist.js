const express = require('express');

const artistController = require('../controllers/artist.js');
const router = express.Router();

router.get('/', artistController.readArtists)

router.post('/', artistController.createArtist)


module.exports = router;