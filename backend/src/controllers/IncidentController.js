import connection from '../database/connection';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('tb_incidents').count();

    const incidents = await connection('tb_incidents')
      .join('tb_ongs', 'tb_ongs.id', '=', 'tb_incidents.id_ong')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'tb_incidents.*',
        'tb_ongs.name',
        'tb_ongs.email',
        'tb_ongs.whatsapp',
        'tb_ongs.city',
        'tb_ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const id_ong = req.headers.authorization;

    const [id] = await connection('tb_incidents').insert({
      title,
      description,
      value,
      id_ong,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const id_ong = req.headers.authorization;

    const incident = await connection('tb_incidents')
      .where('id', id)
      .select('id_ong')
      .first();

    if (incident.id_ong !== id_ong) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('tb_incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  },
};
