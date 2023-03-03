const db = require('../db/index.js');

async function createArtist(req, res) {
    const {name, genre} = req.body
    console.log({name});
    console.log({genre});
    try{
        const { rows: [ artist ] }= await db.query(`INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre])
        console.log({artist})
    res.status(201).json(artist)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = {
    createArtist
}