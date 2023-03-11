const express = require('express');

const artistController = require('../controllers/artist.js');
const albumController = require('../controllers/albums.js');
const router = express.Router();

router.post('/:id/albums', albumController.createAlbum);

module.exports = router;