import express from 'express';

//імпорт middlewares
import { authMiddlevare } from '../../middlewares/auth.middleware.js';
import { shouldHaveRole } from '../../middlewares/access.middleware.js';

//імпорт контролера
import { adminUsersController } from '../../controlers/admin/index.js';

//імпорт ролей
import { ROLES } from '../../models/constants.js';

const router = express.Router();

//ендпойнт для отримання всіх юзерів
router.get('/', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminUsersController.getUsers(req, res).catch(next));

//ендпойнт для отримання даних юзера
router.get('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminUsersController.getUserById(req, res).catch(next));

//ендпойнт для створення юзера
router.post('/', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminUsersController.create(req, res).catch(next));

//ендпойнт для редагування юзера
router.put('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminUsersController.update(req, res).catch(next));

//ендпойнт для видалення юзера
router.delete('/:id', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => adminUsersController.delete(req, res).catch(next));

export default router;
