// eslint-disable-next-line
import multer from 'multer';

import multerConfig from '../config/multer';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      const { aluno_id } = req.body;
      try {
        const { originalname, filename } = req.file;
        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (error) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new FotoController();
