import { todoRepository } from '../repositories/todo.repository.js';
import { todoMongoRepository } from '../repositories/todoMongo.repository.js';
import { HTTPError } from '../utils/HttpError.js';
import { logger } from '../utils/logger.js';

class TodoService {
	async createTodo({ text }, user) {
		logger.info(`TodoService. Got create todo request`, { text });
		return todoMongoRepository.create({ text, owner: user._id });
	}

	async getAllTodos({ limit = 10, page = 0 }, user) {
		page = page > 0 ? page : 0;
		logger.info(`TodoService. Got get ALL todo request`, { limit, page });
		const [todos, total] = await Promise.all([todoMongoRepository.getAll({ limit, page }, user._id), todoMongoRepository.getCount(user._id)]);

		return {
			data: todos.map((todo) => todo.getPublickTodoWithUsers()),
			limit,
			page: page + 1,
			total,
		};
	}
	async getById(id, user) {
		logger.info(`TodoService. Get by id request ${id}`);
		const todo = await todoMongoRepository.getOwnOrSharedTodoById(id, user);
		return todo.getPublickTodoWithUsers();
	}
	async searchByText(text) {
		return todoMongoRepository.searchByText(text);
	}
	async update({ id, todoData, user }) {
		logger.info(`TodoService. Got update todo request ${id}`);
		const todo = await todoMongoRepository.getOwnOrSharedTodoById(id, user);
		if (!todo) {
			logger.warn('TodoService. Todo not found or user dont have access to edit it');
			throw new HTTPError('Notfound', 404);
		}
		logger.info(`TodoService. Got todo from DB ${id}`);

		const newTodo = await todoMongoRepository.update(id, todoData);
		logger.info(`TodoService. Todo updated ${id}`);

		return newTodo.getPublickTodoWithUsers();
	}
	async deleteOne(id, user) {
		const todo = await todoMongoRepository.getOwnTodoById(id, user);
		if (!todo) {
			logger.warn('TodoService. Todo not found or user dont have access to edit it');
			throw new HTTPError('Not found', 404);
		}
		return todoMongoRepository.deleteOne(id);
	}

	async shareWithUsers({ id, sharedWith, user }) {
		logger.info(`TodoService. Got share with users request ${id}`, { sharedWith });
		const todo = await todoMongoRepository.getOwnTodoById(id, user);
		if (!todo) {
			logger.warn('TodoService. Todo not found or user dont have access to edit it');
			throw new HTTPError('Notfound', 404);
		}
		logger.info(`TodoService. Got todo from DB ${id}`);

		const newTodo = await todoMongoRepository.shareWithUsers(id, sharedWith);
		logger.info(`TodoService. Todo updated ${id}`);

		return newTodo.getPublickTodoWithUsers();
	}

	async getUsersToShare({ limit, skip, user }) {
		logger.info(`TodoService. Got user to share`, { limit, skip, user });

		const users = await todoMongoRepository.getUsersToShare(limit, skip, user.id);

		return users.map((user) => user.getPublickProfile());
	}
}

export const todoService = new TodoService();
