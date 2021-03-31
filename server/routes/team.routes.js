const router = require('express').Router();
let Team = require('../models/team.model');
const jwt = require('jsonwebtoken');
const { route } = require('./user.routes');

router.route('/').get((req, res, next) => {
	Team.find()
		.then((team) => res.json(team))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/findadmin').post((req, res) => {
	//find user via payload through jwt.verify
	//set the user as admin for the newly created team
	// Set to delete -> overlaps with detectUser from auth.routes
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
		.then((team) => res.json(team))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res, next) => {
	try {
		const teamName = req.body.teamName;
		const admin = req.body.admin;
		const users = [req.body.users];

		const newTeam = new Team({
			teamName,
			admin,
			users,
		});
		newTeam.save().then((savedTeam) => {
			console.log(savedTeam);
			res.status(200).json(savedTeam);
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.route('/messages').post(verifyToken, (req, res, next) => {
	jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json(`Error: ${err}`);
		} else {
			res.json({
				message: 'Post Created',
				user,
			});
		}
	});
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
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('Team has been deleted'))
		.catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
