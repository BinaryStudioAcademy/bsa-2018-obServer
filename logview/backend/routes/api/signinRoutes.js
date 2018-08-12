const apiResponse = require('express-api-response'),
	userService = require('../../services/userService'),
	passport = require('passport'),
	router = require('express').Router(),
	passportStrategy = require('../../passport/localStrategy');

router.post(
	`/register`,
	async (req, res, next) => {
		try {
			const data = await userService.create(req.body);
			res.data = {
				status: 200,
				message: 'success register',
				user: data
			};
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

router.post(
	`/login`,
	passport.authenticate('local.signin'),
	userService.isLoggedIn,
	(req, res, next) => {
		res.data = {
			status: 200,
			message: 'success login',
			user: req.user.dataValues,
			isAuth: true
		};
		res.err = null;
		next();
	},
	apiResponse
);

router.get(
	`/logout`,
	userService.isLoggedIn,
	(req, res, next) => {
		req.logout();
		res.data = {
			status: 200,
			message: 'success logout',
			isAuth: false
		};
		res.err = null;
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
