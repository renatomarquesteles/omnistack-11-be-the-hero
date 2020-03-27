import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'ONG',
        email: 'contato@email.com',
        whatsapp: '12345678911',
        city: 'São Paulo',
        uf: 'SP',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it("should list ONG's incidents", async () => {
    const { id } = await request(app)
      .post('/ongs')
      .send({
        name: 'ONG',
        email: 'contato@email.com',
        whatsapp: '12345678911',
        city: 'São Paulo',
        uf: 'SP',
      });

    const incident = {
      title: 'Nome do Caso',
      description: 'Detalhes do caso',
      value: 100,
    };

    await request(app)
      .post('/incidents')
      .set('Authorization', { id })
      .send(incident);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', { id });

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(incident)])
    );
  });
});
