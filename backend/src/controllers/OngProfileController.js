import connection from '../database/connection';

export default {
  async index(req, res) {
    const id_ong = req.headers.authorization;

    const incidents = await connection('tb_incidents')
      .where('id_ong', id_ong)
      .select('*');

    return res.json(incidents);
  },
};
