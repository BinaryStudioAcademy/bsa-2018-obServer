const baseUrl = '/api/signin',
	apiResponse = require('express-api-response'),
	passport = require('passport'),
	passportStrategy = require('../../passport/localStrategy');

module.exports = app => {
	app.post(
		baseUrl,
		passport.authenticate('local.signin'),
		(req, res, next) => {
			console.log(res);
		},
		apiResponse
	);
};
