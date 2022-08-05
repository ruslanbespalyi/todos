import { adminTodosRepository } from '../../repositories/admin/index.js';
import { HTTPError } from '../../utils/HttpError.js';
import { logger } from '../../utils/logger.js';

const CURRENT_MODULE = 'Admin todos service';

class AdminTodosService {
	async getTodos({ userId, filter, page, limit }) {
		logger.info(`${CURRENT_MODULE}. Request: get all todos for admin`, { userId, filter, page, limit });
		console.log(userId);
		//якщо передали відємне значення тоді буде 0
		page = page > 0 ? page : 0;

		//формирование фильтра для выборки
		const [todos, count] = await Promise.all([
			adminTodosRepository.getTodos({ userId, filter, page, limit }),
			adminTodosRepository.getCount({ userId, filter }),
		]);

		console.log(todos);
		return {
			data: todos.map((todo) => todo.getPublickTodoWithUsers()),
			limit: limit,
			page: page + 1,
			total: count,
		};
	}

	async getTodoById(id) {
		logger.info(`${CURRENT_MODULE}. Request: get todo by id`, { id });

		const todo = await adminTodosRepository.getTodoById(id);

		return todo.getPublickTodoWithUsers();
	}

	async updateTodoById(id, todo) {
		logger.info(`${CURRENT_MODULE}. Request: update todo by id`, { id });
		const todoExist = await adminTodosRepository.getTodoById(id);
		if (!todoExist) {
			logger.warn(`${CURRENT_MODULE}. Request: todo not found by id`);
			throw new HTTPError('Not found', 404);
		}

		const newTodo = await adminTodosRepository.updateTodoById(id, todo);

		return newTodo.getPublickTodoWithUsers();
	}

	async deleteTodoById(id) {
		logger.info(`${CURRENT_MODULE}. Request: delete todo by id`, { id });
		const todo = await adminTodosRepository.getTodoById(id);
		if (!todo) {
			logger.warn(`${CURRENT_MODULE}. Request: todo not found by id`);
			throw new HTTPError('Not found', 404);
		}

		return await adminTodosRepository.deleteTodoById(id);
	}
}

export const adminTodosService = new AdminTodosService();
