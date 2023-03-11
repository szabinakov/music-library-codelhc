const express = require('express');
const albumController = require('../controllers/albums.js');
const router = express.Router();

router.get('/', albumController.retrieveAlbums);
router.get('/:id', albumController.getAlbumById);
router.post('/:id/albums', albumController.createAlbum);
router.patch('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;