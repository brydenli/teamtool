const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
	teamName: {
		type: String,
		unique: true,
	},
	users: {
		type: Array,
	},
	admin: {
		type: String,
	},
	tasks: {
		type: Array,
	},
	tasks_inProgress: {
		type: Array,
	},
	tasks_completed: {
		type: Array,
	},
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
