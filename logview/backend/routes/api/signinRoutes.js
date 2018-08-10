const apiResponse = require('express-api-response'),
	userService = require('../../services/userService'),
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

router.post(
	'/user/activate/:activationToken',
	async (req, res, next) => {
		try {
			const user = await userService.findByUserActivationToken(
				req.params.activationToken
			);
			if (!user) {
				res.shouldNotHaveData = false;
				res.failureStatus = 404;
				throw new Error(
					'No account with that activation token exists.'
				);
			}

			const update = { active: true };
			if (!(await userService.update(user.id, update)))
				throw new Error(`Cannot activate user.`);

			user.active = true;
			res.data = user;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

module.exports = router;
