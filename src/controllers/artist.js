const db = require('../src/db/index.js');

async function createArtist(req, res) {
    const {name, genre} = req.body
    try{
        const { rows: [ artist ] }= await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`)
    res.sendStatus(201).json(artist)
    } catch(error){
        res.sendStatus(500).json(error.message)
    }
}

module.exports = {
    createArtist
}