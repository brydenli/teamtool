const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
