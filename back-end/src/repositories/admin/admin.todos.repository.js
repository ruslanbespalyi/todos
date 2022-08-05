import { Todos } from '../../models/todoMogo.model.js';
import { logger } from '../../utils/logger.js';

const CURRENT_MODULE = 'Admin todos repository';

const prepareFilters = (userId, filter) => {
	let filters = {};
	if (userId) {
		filters = { ...filters, $or: [{ owner: userId }, { sharedWith: userId }] };
	}
	if (filter) {
		const searchText = new RegExp(`.*${filter}.*`);
		filters = { ...filters, text: { $regex: searchText, $options: 'i' } };
	}

	return filters;
};

class AdminTodosRepository {
	async getTodos({ userId, filter, page, limit }) {
		logger.info(`${CURRENT_MODULE}. Request: get all todos for admin`, { userId, filter, page, limit });

		const filters = prepareFilters(userId, filter);

		return await Todos.find(filters)
			.skip(page * limit)
			.limit(limit)
			.populate({ path: 'owner' })
			.populate({ path: 'sharedWith' });
	}

	async getCount({ userId, filter }) {
		logger.info(`${CURRENT_MODULE}. Request: get count todos for admin`, { userId, filter });

		const filters = prepareFilters(userId, filter);

		return await Todos.countDocuments(filters);
	}

	async getTodoById(id) {
		logger.info(`${CURRENT_MODULE}. Request: get todo by ID`, { id });
		return await Todos.findById(id).populate({ path: 'owner' }).populate({ path: 'sharedWith' });
	}

	async updateTodoById(id, todo) {
		logger.info(`${CURRENT_MODULE}. Request: update todo by ID`, { id });
		return await Todos.findByIdAndUpdate(id, todo, { new: true }).populate({ path: 'owner' }).populate({ path: 'sharedWith' });
	}

	async deleteTodoById(id) {
		logger.info(`${CURRENT_MODULE}. Request: delete todo by ID`, { id });
		return await Todos.deleteOne({ _id: id });
	}
}

export const adminTodosRepository = new AdminTodosRepository();
