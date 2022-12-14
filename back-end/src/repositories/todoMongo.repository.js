import { Todos } from '../models/todoMogo.model.js';
import { Users } from '../models/user.model.js';
import { HTTPError } from '../utils/HttpError.js';
import { logger } from '../utils/logger.js';

class TodoMongoRepository {
	async getOwnOrSharedTodoById(id, user) {
		const todo = await Todos.findOne({
			$and: [{ _id: id }, { $or: [{ owner: user._id }, { sharedWith: user._id }] }],
		})
			.populate({ path: 'owner' })
			.populate({ path: 'sharedWith' });
		if (!todo) {
			throw new HTTPError('NotFound', 404);
		}
		return todo;
	}
	async getTodoById() {
		return Todos.findOne({ _id: id });
	}
	async getOwnTodoById(id, user) {
		const todo = await Todos.findOne({
			$and: [{ _id: id }, { owner: user._id }],
		});
		if (!todo) {
			throw new HTTPError('NotFound', 404);
		}
		return todo;
	}
	async getAll({ limit, page }, userId) {
		const todos = await Todos.find({
			$or: [{ owner: userId }, { sharedWith: userId }],
		})
			.skip(limit * page)
			.limit(limit)
			.populate({ path: 'owner' })
			.populate({ path: 'sharedWith' });
		return todos;
	}
	async searchByText(text) {
		const searchText = new RegExp(`.*${text}.*`);

		return Todos.find({ text: { $regex: searchText, $options: 'i' } });
	}
	async getCount(id) {
		return Todos.countDocuments({
			$or: [{ owner: id }, { sharedWith: id }],
		});
	}
	async create(object) {
		logger.info(`TodoRepository. Create todo request`, object);
		const todo = new Todos(object);
		await todo.save();

		return todo.getPublickTodo();
	}
	async deleteOne(id) {
		return Todos.deleteOne({ _id: id });
	}

	async update(id, todo) {
		logger.info(`TodoRepository. Update todo request id=${id}`, { todo });
		return Todos.findByIdAndUpdate(id, todo, { new: true }).populate({ path: 'owner' }).populate({ path: 'sharedWith' });
	}

	async shareWithUsers(id, sharedWith) {
		logger.info(`TodoRepository. Update todo request id=${id}`, { sharedWith });
		return Todos.findByIdAndUpdate(id, { sharedWith }, { new: true }).populate({ path: 'owner' }).populate({ path: 'sharedWith' });
	}

	async getUsersToShare(limit, skip, userId) {
		logger.info(`TodoRepository. Users to share`);
		return Users.find({ _id: { $nin: [userId] } })
			.skip(skip)
			.limit(limit);
	}
}

export const todoMongoRepository = new TodoMongoRepository();
