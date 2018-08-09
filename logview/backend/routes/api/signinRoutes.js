const baseUrl = '/api',
	apiResponse = require('express-api-response'),
	passport = require('passport'),
	userRepository = require('../../domains/postgres/repositories/userRepository'),
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
			req.logout();
			next();
		},
		apiResponse
	);

	app.post(
		`${baseUrl}/activate/:activationToken`,
		(req, res, next) => {
			new Promise(async (resolve, reject) => {
				const user = await userService.findByActivationToken(
					req.params.activationToken
				);
				if (!user)
					reject(
						new Error(
							'No account with that activation token exists.'
						)
					);

				resolve(user);
			})
				.then(user => {
					return new Promise(async (resolve, reject) => {
						try {
							if (
								!(await userService.update(user.id, {
									active: true
								}))
							)
								throw new Error(`Cannot activate user.`);
							res.data = user;
							res.err = null;
							next();
							resolve();
						} catch (err) {
							reject(err);
						}
					});
				})
				.catch(err => {
					res.data = null;
					res.err = err;
					next();
				});
		},
		apiResponse
	);
};
