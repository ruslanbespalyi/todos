import mongoose from 'mongoose';
import { ROLES } from './constants.js';
import { Todos } from './todoMogo.model.js';
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: { type: String, unique: true },
		password: { type: String },
		dateOfBirth: { type: String },
		role: { type: String, default: ROLES.USER },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		methods: {
			getPublickProfile() {
				const { password, _id, __v, role, ...user } = this._doc;
				return { id: _id, ...user, isAdmin: role === ROLES.ADMIN };
			},
			getPublickShortProfile() {
				const { firstName, lastName, _id, email } = this._doc;
				return { id: _id, firstName, lastName, email };
			},
			isAdmin() {
				return this.role === ROLES.ADMIN;
			},
			hasRole(role) {
				return this.role === role;
			},
		},
	}
);

userSchema.pre('deleteOne', async function (next) {
	try {
		const userId = this._conditions._id;
		await Todos.deleteMany({ owner: userId });
		await Todos.updateMany({ sharedWith: userId }, { $pull: { sharedWith: userId } });
		next();
	} catch (error) {
		next(error);
	}
});

export const Users = mongoose.model('Users', userSchema);
