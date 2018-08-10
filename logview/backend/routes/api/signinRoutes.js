const apiResponse = require('express-api-response'),
	passport = require('passport'),
	router = require('express').Router(),
	passportStrategy = require('../../passport/localStrategy');

router.post(
	`/login`,
	passport.authenticate('local.signin'),
	(req, res, next) => {
		res.data = req.user.dataValues;
		next();
	},
	apiResponse
);

router.get(
	`/logout`,
	(req, res, next) => {
		req.logout();
		next();
	},
	apiResponse
);

module.exports = router;
