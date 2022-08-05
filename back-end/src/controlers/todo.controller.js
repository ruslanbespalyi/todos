import { todoService } from '../services/todo.service.js';
import { logger } from '../utils/logger.js';

class TodoController {
	constructor(service, logger) {
		this.service = service;
		this.log = logger;
	}
	async getAllTodos(req, res) {
		this.log.info('Got getAllTodos request');
		let { page, limit } = req.query;
		if (page) {
			page = parseInt(page);
		}
		if (limit) {
			limit = parseInt(limit);
		}
		const todos = await this.service.getAllTodos({ page, limit }, req.user);
		res.json(todos);
	}
	// text, isCompleted, id
	async createTodo(req, res) {
		this.log.info('Got createTodo request');
		const todo = await this.service.createTodo(req.body, req.user);
		res.json(todo);
	}
	async deleteOne(req, res) {
		const id = req.params.id;
		this.log.info('Got deleteOne request', { id: `${id}` });
		await this.service.deleteOne(id, req.user);
		res.json();
	}

	async getById(req, res) {
		const id = req.params.id;
		this.log.info('Got getById request', { id: `${id}` });
		const todo = await this.service.getById(id, req.user);
		this.log.info('Got response from service', { todo });

		res.json(todo);
	}

	async update(req, res) {
		const id = req.params.id;
		const todo = req.body;
		this.log.info('Got update request', { id, todo });

		const newTodo = await this.service.update({
			id,
			todoData: todo,
			user: req.user,
		});
		this.log.info('Got updated todo', { id, newTodo });

		res.json(newTodo);
	}
	async searchByText(req, res) {
		this.log.info('Got queryLike request');
		const { text } = req.query;

		const result = await this.service.searchByText(text);
		this.log.info('Got queryLike responce', { result });

		res.json(result);
	}

	async shareWithUsers(req, res) {
		this.log.info('Got share request');
		const id = req.params.id;
		const { sharedWith } = req.body;

		const newTodo = await this.service.shareWithUsers({ id, sharedWith, user: req.user });

		res.json(newTodo);
	}

	//get users to share
	async getUsersToShare(req, res) {
		this.log.info(`Request: users to share`);
		let { limit, skip } = req.query;
		if (skip) {
			skip = parseInt(skip);
		}
		if (limit) {
			limit = parseInt(limit);
		}

		const users = await this.service.getUsersToShare({ limit, skip, user: req.user });

		res.json(users);
	}
}

export const todoController = new TodoController(todoService, logger);
