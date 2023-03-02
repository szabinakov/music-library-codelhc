const db = require('../db/index.js');

async function createArtist(req, res) {
    const {name, genre} = req.body
    try{
        const { rows: [ artist ] }= await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`)
    res.sendStatus(201).json(artist)
    } catch(err){
        res.sendStatus(500).json(err.message)
    }
}

module.exports = {
    createArtist
}