const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	user: {
		type: Object,
	},
});

const Tokens = mongoose.model('Tokens', tokenSchema);

module.exports = Tokens;
