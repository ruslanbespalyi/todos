import bcrypt from 'bcrypt';

import { adminUsersRepository, adminTodosRepository } from '../../repositories/admin/index.js';
import { HTTPError } from '../../utils/HttpError.js';
import { logger } from '../../utils/logger.js';
import { ROLES } from '../../models/constants.js';

const CURRENT_MODULE = 'Admin users service';

class AdminUsersService {
	getPasswordHash(password) {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}

	async getUsers({ email, page = 0, limit = 10 }) {
		logger.info(`${CURRENT_MODULE}. Request: get all users for admin`);
		//якщо передали відємне значення тоді буде 0
		page = page > 0 ? page : 0;

		const [users, count] = await Promise.all([adminUsersRepository.getUsers({ page, limit }, email), adminUsersRepository.getCount(email)]);
		return {
			data: users.map((user) => user.getPublickProfile()),
			limit: limit,
			page: page + 1,
			total: count,
		};
	}

	async getById(id) {
		logger.info(`${CURRENT_MODULE}. Request: get user by ID for admin`, { id });
		const user = await adminUsersRepository.getUserById(id);

		return user.getPublickProfile();
	}

	async create({ firstName, lastName, email, password, dateOfBirth, isAdmin }) {
		logger.info(`${CURRENT_MODULE}. Request: create new user`, { firstName, lastName, email, password, dateOfBirth, isAdmin });

		//подивимось чи є користувач з таким милом
		const userWithCurrentEmail = await adminUsersRepository.getUserByEmail(email);
		if (userWithCurrentEmail) {
			logger.warn(`${CURRENT_MODULE}. User already exist`, { email });
			throw new HTTPError('Email already in use', 400);
		}

		const newUser = await adminUsersRepository.create({
			firstName,
			lastName,
			email,
			password: this.getPasswordHash(password),
			dateOfBirth,
			role: isAdmin ? ROLES.ADMIN : ROLES.USER,
		});

		return newUser.getPublickProfile();
	}

	async updateOne({ id, firstName, lastName, email, password, dateOfBirth, isAdmin }) {
		logger.info(`${CURRENT_MODULE}. Request: update user by ID`, { id, firstName, lastName, email, password, dateOfBirth, isAdmin });

		//перевіримо чи є такий користувач по ID
		const user = await adminUsersRepository.getUserById(id);
		if (!user) {
			logger.warn(`${CURRENT_MODULE}. User not found.`);
			throw new HTTPError('Not found', 404);
		}

		//думаю потрібно відконтролити чи є вже користувач з таким email
		const userWithCurrentEmail = await adminUsersRepository.getUserByEmail(email, user);
		if (userWithCurrentEmail) {
			logger.warn(`${CURRENT_MODULE}. User already exist`, { email });
			throw new HTTPError('Email already in use', 400);
		}

		//користувача знайдено, оновимо дані користувача
		const newUser = await adminUsersRepository.updateOne(id, {
			firstName,
			lastName,
			email,
			password: this.getPasswordHash(password),
			dateOfBirth,
			role: isAdmin ? ROLES.ADMIN : ROLES.USER,
			updatedAt: Date.now(),
		});

		return newUser.getPublickProfile();
	}

	async deleteOne(id) {
		//перед видаленням потрібно перевірити чи є такий користувач
		const user = adminUsersRepository.getUserById(id);
		if (!user) {
			logger.warn(`${CURRENT_MODULE}. User not found by ID`, { id });
		}

		return await adminUsersRepository.deleteOne(id);
	}
}

export const adminUsersService = new AdminUsersService();
