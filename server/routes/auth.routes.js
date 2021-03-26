const router = require('express').Router();
let User = require('../models/user.model');
let Token = require('../models/token.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const express = require('express');

//server just for login, logout, refresh tokens

router.route('/').get((req, res, next) => {
	Token.find()
		.then((tokens) => res.json(tokens))
		.catch((err) => res.json('err'));
});

router.route('/verify').post((req, res) => {
	//grab cookies on client side and send through axios
	const accessToken = req.body.accessToken;
	const check = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
	if (check) {
		res.status(200).json('accepted');
	} else {
		res.status(404).json(`Error: ${err}`);
	}
});

router.route('/detectUser').post((req, res) => {
	const accessToken = req.body.accessToken;
	const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
	const user = {
		username: payload.user.username,
		id: payload.user._id,
	};
	res.status(200).json(user);
});

router.route('/').post((req, res, next) => {
	try {
		let user;
		User.find({ username: req.body.username })
			.then((response) => {
				user = response[0];
				console.log(user);
			})
			.then(async () => {
				if (user) {
					console.log('user is ' + user);
					console.log('req.body.password is ' + req.body.password);
					console.log('user password is ' + user.password);
					const compare = await bcrypt.compare(
						req.body.password,
						user.password
					);
					console.log(`Compare is ${compare}`);

					if (compare) {
						const accessToken = generateAccessToken(user);
						const refreshToken = generateRefreshToken(user);

						// const newToken = new Token({
						// 	token: refreshToken,
						// 	user: user,
						// });
						// newToken
						// 	.save()
						// 	.then(() => console.log('New refresh token created'))
						// 	.catch((err) => {
						// 		res.status(400).send(`Error: ${err}`);
						// 	});

						res
							.status(202)
							.json({ accessToken: accessToken, refreshToken: refreshToken });
					} else {
						res.json('Authentification Unsuccessful');
					}
				} else {
					res.json('Authentification Unsuccessful');
				}
			})
			.catch((err) => res.status(400).json(`Error: ${err}`));
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

router.route('/token').post((req, res, next) => {
	const refreshToken = req.body.token;
	if (refreshToken === null) return res.status(401);
	const token = Token.findOne({ token: refreshToken });
	if (!token) return res.status(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403);
		const accessToken = generateAccessToken();
		res.json({ accessToken: accessToken });
	});
}); //works

router.route('/logout').delete((req, res, next) => {
	//want to delete the refresh token from the database using this route // set this up when the DB can store refresh tokens
	//need to make a model for refresh tokens (with expiry date) and add CRUD operations for other routes to the database to store/delete these refresh tokens
	const dbtoken = Token.findOne({ token: req.body.token });
	Token.findByIdAndDelete(dbtoken._id)
		.then(() => res.status(200).json('Logged out'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

generateAccessToken = (user) => {
	const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '1h',
	});
	return accessToken;
};

generateRefreshToken = (user) => {
	const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
	return refreshToken;
};

module.exports = router;