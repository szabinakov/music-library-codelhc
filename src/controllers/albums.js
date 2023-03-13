const db = require('../db/index.js');

async function createAlbum(req, res) {
    const {name, year} = req.body;
    const {id} = req.params;

    try{
        const { rows: [ album ] } = await db.query(`INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *`, [name, year, id])
       
    res.status(201).json(album)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

async function retrieveAlbums(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM Albums');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  
  async function getAlbumById(req, res){
    try {
      const { id } = req.params;
      const {
        rows: [album],
      } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);
  
      if (!album) {
        res.status(404).json({ message: `The album ID: ${id} does not exist` });
      }
      res.status(200).json(album);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  async function updateAlbum(req, res) {
    const { id } = req.params;
    const { name, year } = req.body;
  
    let query, params;
  
    if (name && year) {
      query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING name , year, id`;
      params = [name, year, id];
    } else if (name) {
      query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING name , year, id`;
      params = [name, id];
    } else if (year) {
      query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING name , year, id`;
      params = [year, id];
    }
    try {
      const {
        rows: [albums],
      } = await db.query(query, params);
  
      if (!albums) {
        return res.status(404).json({ message: `Album ${id} does not exist` });
      }
      res.status(200).json(albums);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  };
  
  async function deleteAlbum(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(
        'DELETE FROM Albums WHERE id = $1 RETURNING id , name, year',
        [id]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({
          message: `The album ID: ${id} does not exist`,
        });
      }
  
      const deletedAlbum = rows[0];
      res.status(200).json(deletedAlbum);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

module.exports = {
    createAlbum,
    retrieveAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
}