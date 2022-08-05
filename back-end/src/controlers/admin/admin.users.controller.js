import { adminUsersService } from '../../services/admin/index.js';
import { HTTPError } from '../../utils/HttpError.js';
import { logger } from '../../utils/logger.js';

const CURRENT_MODULE = 'Admin users controller';

class AdminUsersController {
	constructor(service, logger) {
		this.service = service;
		this.logger = logger;
	}

	//get all users
	async getUsers(req, res) {
		let { email, page, limit } = req.query;

		this.logger.info(`${CURRENT_MODULE}.Request: get all users for admin.`, { email, page, limit });

		//Потрібно конвертувати пейджу і ліміт в числове значення
		if (page) {
			page = parseInt(page);
		}
		if (limit) {
			limit = parseInt(limit);
		}

		const users = await this.service.getUsers({ page, limit, email });
		res.json(users);
	}

	//get user by id
	async getUserById(req, res) {
		const id = req.params.id;
		this.logger.info(`${CURRENT_MODULE}.Request: get user by ID for admin.`, { id });
		const user = await this.service.getById(id);
		this.logger.info('Response from service', { user });

		res.json(user);
	}

	//create user
	async create(req, res) {
		const { firstName, lastName, email, password, confirmPassword, dateOfBirth, isAdmin } = req.body;

		this.logger.info(`${CURRENT_MODULE}. Request: create new user`, { firstName, lastName, email, dateOfBirth, isAdmin });

		if (password != confirmPassword) {
			this.logger.error(`${CURRENT_MODULE}. Confirm password are wrong`);
			throw new HTTPError('Confirm password are wrong', 400);
		}

		const newUser = await this.service.create({
			firstName,
			lastName,
			email,
			password,
			dateOfBirth,
			isAdmin,
		});

		res.json(newUser);
	}

	//update user
	async update(req, res) {
		const id = req.params.id;
		const { firstName, lastName, email, password, confirmPassword, dateOfBirth, isAdmin } = req.body;

		this.logger.info(`${CURRENT_MODULE}. Request: update user by ID`, { id, firstName, lastName, email, dateOfBirth, isAdmin });

		if (password != confirmPassword) {
			this.logger.error(`${CURRENT_MODULE}. Confirm password are wrong`);
			throw new HTTPError('Confirm password are wrong', 400);
		}

		const newUser = await this.service.updateOne({
			id,
			firstName,
			lastName,
			email,
			password,
			dateOfBirth,
			isAdmin,
		});

		res.json(newUser);
	}

	//delete user
	async delete(req, res) {
		const id = req.params.id;

		this.logger.info(`${CURRENT_MODULE}. Request: delete user by ID`, { id });

		await this.service.deleteOne(id);

		return res.json();
	}
}

export const adminUsersController = new AdminUsersController(adminUsersService, logger);
