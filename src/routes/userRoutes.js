import { Router } from 'express';
import userController from '../controllers/UserController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', userController.index);
// router.get('/', loginRequired, userController.show);

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
index ➝ Lista todos ➝ GET
store/create ➝ cria novo ➝ POST
delete ➝ delete ➝ DELETE
show ➝ mostra um ➝ GET
update ➝atualiza ➝ PATCH ou PUT
*/
