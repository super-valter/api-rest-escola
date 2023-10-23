import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoControlle {
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id Aluno não indentificado.'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não exite.'],
        });
      }

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }

  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['filename', 'url'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id Aluno não indentificado.'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não exite.'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id Aluno não indentificado.'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não exite.'],
        });
      }

      await aluno.destroy();

      return res.json(`O aluno ${aluno.nome} foi deletado com sucesso.`);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((errors) => errors.message),
      });
    }
  }
}

export default new AlunoControlle();
