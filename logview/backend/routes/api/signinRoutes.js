const baseUrl = '/api',
	apiResponse = require('express-api-response'),
	passport = require('passport'),
	passportStrategy = require('../../passport/localStrategy');

module.exports = app => {
	app.post(
		`${baseUrl}/login`,
		passport.authenticate('local.signin'),
		(req, res, next) => {
			res.data = req.user.dataValues;
			next();
		},
		apiResponse
	);

	app.get(
		`${baseUrl}/logout`,
		(req, res, next) => {
			console.log(`Before Logout: ${req.user}`);
			req.logout();
			console.log(`After Logout: ${req.user}`);
			next();
		},
		apiResponse
	);
};
