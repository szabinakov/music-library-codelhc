const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');


describe('Albums Endpoints', () => {
  let artistId;

  beforeEach(async () => {
    await db.query('DELETE FROM Albums');
    await db.query('DELETE FROM Artists');
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Britney Spears', 'Pop']
    );
    artistId = rows[0].id;
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artistId}/albums`)
        .send({
          name: '...Baby one more time',
          year: 1999,
          artistId: artistId,
        })
        expect(status).to.equal(201);
        expect(body.name).to.equal('...Baby one more time');
        expect(body.year).to.equal(1999);

        const {
            rows: [albumData],
          } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
          expect(albumData.name).to.equal('...Baby one more time');
          expect(albumData.year).to.equal(1999);
      });
    });


  
  });