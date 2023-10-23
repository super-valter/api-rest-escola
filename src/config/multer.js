// eslint-disable-next-line
import multer from 'multer';
import { extname, resolve } from 'path';
// import { mkdirSync, existsSync } from 'fs';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

/* const folderUserExist = async (userId) => {
  const folderUpload = resolve(__dirname, '..', '..', 'uploads');
  const searchFolderAluno = `${folderUpload}/a${userId}`;

  if (!existsSync(searchFolderAluno)) {
    mkdirSync(searchFolderAluno, { recursive: true });
  }
}; */

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
    /*   console.log(req.body.aluno_id);
      const { aluno_id } = req.body;
      folderUserExist(aluno_id); */
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
