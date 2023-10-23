import User from '../models/User';

class UserControle {
  /* STORE */
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }

  /* Index */
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  /* Show */
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);
    }
  }

  /* Update */
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          error: ['Usuario não encontrado.'],
        });
      }

      console.log(req.body);

      const userupdate = await user.update(req.body);
      const { id, nome, email } = userupdate;

      return res.json({ id, nome, email });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }

  /* DElete */
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          error: ['Usuario não encontrado.'],
        });
      }

      await user.destroy();

      return res.json(`Usuario ${user.nome} deletado com sucesso`);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }
}

export default new UserControle();
