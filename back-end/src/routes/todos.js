import express from 'express';
import { validate, ValidationError, Joi } from 'express-validation';
import { todoController } from '../controlers/todo.controller.js';
import { authMiddlevare } from '../middlewares/auth.middleware.js';
import { shouldHaveRole } from '../middlewares/access.middleware.js';
import { ROLES } from '../models/constants.js';

const router = express.Router();

const createTodoValidation = {
	body: Joi.object({
		text: Joi.string().min(5).required(),
	}),
};

//ендпойнт для отримання юзерів для шарінгу
router.get('/share', authMiddlevare, async (req, res, next) => todoController.getUsersToShare(req, res).catch(next));

router.get('/search', authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => todoController.searchByText(req, res).catch(next));
// get all todos list
router.get('/', authMiddlevare, async (req, res, next) => todoController.getAllTodos(req, res).catch(next));

// create new todos
router.post('/', authMiddlevare, validate(createTodoValidation), async (req, res, next) => todoController.createTodo(req, res).catch(next));

// delete todos by id
router.delete('/:id', authMiddlevare, async (req, res, next) => todoController.deleteOne(req, res).catch(next));

// edit todos
router.put('/:id', authMiddlevare, async (req, res, next) => todoController.update(req, res).catch(next));

router.get('/:id', authMiddlevare, async (req, res, next) => todoController.getById(req, res).catch(next));

//share todos
router.post('/share/:id', authMiddlevare, async (req, res, next) => todoController.shareWithUsers(req, res).catch(next));

export default router;
