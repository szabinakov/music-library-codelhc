const express = require('express');

const artistController = require('../controllers/artist.js');
const router = express.Router();

router.get('/', artistController.retrieveArtists)

router.get('/:id', artistController.artistById)


router.post('/', artistController.createArtist)

router.patch('/:id', artistController.updateArtist)


module.exports = router;