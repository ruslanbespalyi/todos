import express from 'express';

//імпорт middlewares
import { authMiddlevare } from '../../middlewares/auth.middleware.js';
import { shouldHaveRole } from '../../middlewares/access.middleware.js';

//імпорт контролера
import { adminTodosController } from '../../controlers/admin/index.js';

//імпорт ролей
import { ROLES } from '../../models/constants.js';

const router = express.Router();

//ендпойнт для отримання всіх todo
router.get('/', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminTodosController.getTodos(req, res).catch(next));

//ендпойнт для отримання інфо по todo
router.get('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminTodosController.getTodoById(req, res).catch(next));

//ендпойнт для редагування todo
router.put('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminTodosController.updateTodoByID(req, res).catch(next));

//ендпойнт для видалення todo
router.delete('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) =>
	adminTodosController.deleteTodoById(req, res).catch(next)
);

export default router;
