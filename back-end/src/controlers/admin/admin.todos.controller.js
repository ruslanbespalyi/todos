import { adminTodosService } from '../../services/admin/index.js';

import { logger } from '../../utils/logger.js';

const CURRENT_MODULE = 'Admin todos controller';

class AdminTodosController {
	constructor(service, logger) {
		this.service = service;
		this.logger = logger;
	}

	async getTodos(req, res) {
		let { userId, filter, page, limit } = req.query;

		this.logger.info(`${CURRENT_MODULE}. Request: get all todos for admin`, { userId, filter, page, limit });

		if (page) {
			page = parseInt(page);
		}

		if (limit) {
			limit = parseInt(limit);
		}

		const todos = await this.service.getTodos({ userId, filter, page, limit });

		res.json(todos);
	}

	async getTodoById(req, res) {
		const id = req.params.id;

		this.logger.info(`${CURRENT_MODULE}. Request: get todo by ID`, { id });

		const todo = await this.service.getTodoById(id);

		res.json(todo);
	}

	async updateTodoByID(req, res) {
		const id = req.params.id;
		const todo = req.body;
		this.logger.info(`${CURRENT_MODULE}. Request: update todo by ID`, { id, todo });

		const newTodo = await this.service.updateTodoById(id, todo);

		res.json(newTodo);
	}

	async deleteTodoById(req, res) {
		const id = req.params.id;

		this.logger.info(`${CURRENT_MODULE}. Request: delete todo by ID`, { id });

		await this.service.deleteTodoById(id);
		res.json();
	}
}

export const adminTodosController = new AdminTodosController(adminTodosService, logger);
