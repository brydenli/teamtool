const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async (req, res, next) => {
	User.find()
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res, next) => {
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	const newUser = new User({
		username,
		email,
		password,
		firstName,
		lastName,
	});

	newUser
		.save()
		.then(() => res.json('New user saved'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').put((req, res, next) => {
	let updates = req.body;

	User.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
		.then((user) => res.json(user))
		.then(() => res.json('User has been updated'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User has been deleted'))
		.catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
