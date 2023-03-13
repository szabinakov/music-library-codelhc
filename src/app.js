const express = require('express');
const artistRouter = require('./routes/artist')
const albumRouter = require('./routes/albums')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
res.status(200);
res.send("hello");
})

app.use('/artists',artistRouter)
app.use('/artists', albumRouter);

app.use('/albums', albumRouter);

module.exports = app;