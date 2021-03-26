const router = require('express').Router();
let Team = require('../models/team.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res, next) => {
	Team.find()
		.then((team) => res.json(team))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/findadmin').post((req, res) => {
	//find user via payload through jwt.verify
	//set the user as admin for the newly created team
	try {
		const accessToken = req.body.accessToken;
		const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const response = {
			username: payload.user.username,
			id: payload.user._id,
		};
		res.status(200).json(response);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

router.route('/:id').get((req, res, next) => {
	Team.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res, next) => {
	try {
		console.log('the new team is ' + req.body.users);
		const teamName = req.body.teamName;
		const admin = req.body.admin;
		const users = [req.body.users];

		const newTeam = new Team({
			teamName,
			admin,
			users,
		});
		newTeam
			.save()
			.then(() => res.json(`New team created!`))
			.catch((err) => res.status(400).json(err));
	} catch (err) {
		res.status(400).send(err);
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
	// IT WORKS WHEN USING THE AUTHORIZATION IN POSTMAN
	// do we need this in user.routes or team.routes?
});

router.route('/:id').put((req, res, next) => {
	let newAdminTeam = req.body.adminOf;
	let newTeam = req.body.team;
	let updates = {
		adminOf: adminOf.push(newAdminTeam),
		teams: teams.push(newTeam),
	};

	User.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
		.then((user) => res.json(user))
		.then(() => res.json('Team name has been updated'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('Team has been deleted'))
		.catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
