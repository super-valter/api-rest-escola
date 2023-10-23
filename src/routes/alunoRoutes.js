import { Router } from 'express';
import alunoController from '../controllers/AlunoController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/:id', loginRequired, alunoController.show);
router.get('/', loginRequired, alunoController.index);

router.post('/', loginRequired, alunoController.store);
router.put('/:id', loginRequired, alunoController.update);

router.delete('/:id', loginRequired, alunoController.delete);

export default router;
