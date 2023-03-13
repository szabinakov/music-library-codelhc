const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', async () => {
  let artistId, albumId;

  beforeEach(async () => {
    await db.query('DELETE FROM Albums');
    await db.query('DELETE FROM Artists');
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Britney Spears', 'Pop']
    );
    artistId = rows[0].id;
  });

  const { rows } = await db.query(
    'INSERT INTO Albums (name, year, artist_id) VALUES($1, $2, $3) RETURNING *',
    ['...Baby One More Time', 2005, artistId]
  );
  albumId = rows[0].id;

  describe('PATCH /albums/:id', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albumId}`)
        .send({ name: '...Baby One More Time', year: 1999 });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: albumId,
        name: '...Baby One More Time',
        year: 199,
        artistId: artistId,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/99999999')
        .send({ name: 'Frankie Sinatra', year: 42789 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 99999999 does not exist');
    });
  });
});