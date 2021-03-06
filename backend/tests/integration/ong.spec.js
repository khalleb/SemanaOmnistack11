const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy();
  })

  it('Shoud be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG do Ronaldinho Gaucho",
        email: "ongdomal@gmail.com",
        whatsapp: "6200000000",
        city: "Sampa",
        uf: "SP"
      })
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  })
})  