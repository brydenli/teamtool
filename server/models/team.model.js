const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
	teamName: {
		type: String,
		unique: true,
	},
	users: {
		type: Array,
		unique: true,
		index: true,
	},
	admin: {
		type: String,
	},
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
