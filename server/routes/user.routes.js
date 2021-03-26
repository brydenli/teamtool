const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
	console.log('unos');

	const authHeader = req.headers['authorization'];
	console.log('authheader: ' + authHeader);

	const token = authHeader && authHeader.split(' ')[1];
	console.log('token: ' + token);

	req.token = token;
	if (req.token === null) return res.sendStatus(401);
	next();

	//need this in user.routes or team.routes?
};

router.route('/').get((req, res, next) => {
	User.find()
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res, next) => {
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/teamlist/:id').get((req, res, next) => {
	User.findById(req.params.id).then((response) => {
		const teams = response.teams;
		res.status(200).json(teams);
	});
});

router.route('/add').post(async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		console.log(hashedPassword);
		const username = req.body.username;
		const email = req.body.email;
		const password = hashedPassword;
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
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
});

router.route('/messages').post(verifyToken, (req, res, next) => {
	console.log('now in messages');
	jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log('now in jwt verify');
		console.log(req.token);
		console.log('oopd ' + process.env.ACCESS_TOKEN_SECRET);
		console.log('user' + user);
		if (err) {
			return res.status(403).json(`Error: ${err}`);
		} else {
			console.log('now in else');
			res.json({
				message: 'Post Created',
				user,
			});
		}
	});
	//need this in user.routes or team.routes?
});

router.route('/:id').put((req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$addToSet: {
				adminOf: [req.body.adminOf],
				teams: [req.body.teams],
			},
		},
		{ new: true }
	)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User has been deleted'))
		.catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
