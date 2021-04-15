const router = require('express').Router();
let Team = require('../models/team.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res, next) => {
	Team.find()
		.then((team) => res.json(team))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/findadmin').post((req, res) => {
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

router.route('/:id').get((req, res) => {
	Team.findById(req.params.id)
		.then((team) => res.json(team))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
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

router.route('/teamauth').post((req, res) => {
	Team.findById(req.body.teamid)
		.then((team) => {
			let check = team.users.includes(req.body.user);
			console.log('check is ' + check);
			if (check) {
				res.status(200).json('accepted');
			} else {
				res.status(400).json('Not Authorized');
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.route('/messages').post(verifyToken, (req, res) => {
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

router.route('/tasks/:id').get((req, res) => {
	Team.findById(req.params.id)
		.then((team) => {
			res.status(200).json(team.tasks);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.route('/tasks1/:id').get((req, res) => {
	Team.findById(req.params.id)
		.then((team) => {
			res.status(200).json(team.tasks_inProgress);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.route('/tasks').post((req, res) => {
	Team.findOneAndUpdate(
		{ _id: req.body.teamID },
		{
			$addToSet: {
				tasks: [req.body.taskName],
			},
		},
		{
			new: true,
		}
	)
		.then(() => {
			res.status(200).json('Task created');
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.route('/progress1/:id').put((req, res) => {
	Team.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$addToSet: {
				tasks_inProgress: [req.body.taskName],
			},
			$pull: {
				tasks: [req.body.taskName],
			},
		},
		{
			new: true,
		}
	)
		.then(() => res.status(200).json(res))
		.catch((err) => res.status(400).json(err));
});

router.route('/adduser/:id').put((req, res) => {
	Team.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$addToSet: {
				users: [req.body.user],
			},
		},
		{ new: true }
	)
		.then(() => res.status(200).json('User added to team'))
		.catch((err) => res.status(400).json(err));
});

router.route('/leave-team').put((req, res) => {
	Team.findByIdAndUpdate(
		req.body.teamID,
		{
			$pull: {
				users: req.body.user,
			},
		},
		{ new: true }
	)
		.then(() => {
			res.status(200).json('Action completed');
		})
		.catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
	Team.findByIdAndDelete(req.params.id)
		.then(() => res.json('Team has been deleted'))
		.catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
