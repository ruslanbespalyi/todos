import { Users } from '../../models/user.model.js';
import { logger } from '../../utils/logger.js';

const CURRENT_MODULE = 'Admin users repository';

class AdminUsersRepository {
	async getUsers({ page, limit }, email) {
		logger.info(`${CURRENT_MODULE}. Request: get all users for admin`, { page, limit, email });

		let filters = {};
		if (email) {
			const searchText = new RegExp(`.*${email}.*`);
			filters = { ...filters, email: { $regex: searchText, $options: 'i' } };
		}

		return await Users.find(filters)
			.skip(page * limit)
			.limit(limit);
	}

	async getCount(email) {
		logger.info(`${CURRENT_MODULE}. Request: get count users for admin`, email);
		let filters = {};
		if (email) {
			filters = { ...filters, email };
		}

		return await Users.countDocuments(filters);
	}

	async getUserById(id) {
		logger.info(`${CURRENT_MODULE}. Request: get user by id`, { id });
		return await Users.findById(id);
	}

	async getUserByEmail(email, currentUserId) {
		logger.info(`${CURRENT_MODULE}. Request: get user by email, without current id user`, { email, currentUserId });
		return await Users.findOne({
			email: email,
			_id: { $ne: currentUserId },
		});
	}

	async create(dataUser) {
		logger.info(`${CURRENT_MODULE}. Request: create new user`, { dataUser });
		const user = new Users(dataUser);
		return await user.save();
	}

	async updateOne(id, dataUser) {
		logger.info(`${CURRENT_MODULE}. Request: update user by id`, { id, dataUser });
		return await Users.findOneAndUpdate({ _id: id }, dataUser, { new: true });
	}

	async deleteOne(id) {
		logger.info(`${CURRENT_MODULE}. Request: delete user by id`, { id });
		return await Users.deleteOne({ _id: id });
	}
}

export const adminUsersRepository = new AdminUsersRepository();
