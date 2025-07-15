import { Router } from 'express';
import * as TaskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.post('/', TaskController.create);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);

export default router;
