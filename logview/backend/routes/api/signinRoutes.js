const apiResponse = require('express-api-response'),
	isLoggedInMiddlewre = require('../../middleware/isLoggedInMiddleware'),
	userService = require('../../services/userService'),
	passport = require('passport'),
	router = require('express').Router(),
	passportStrategy = require('../../passport/localStrategy');

router.post(
	`/login`,
	passport.authenticate('local.signin'),
	(req, res, next) => {
		res.data = req.user.dataValues;
		res.err = null;
		next();
	},
	apiResponse
);

router.get(`/logout`, isLoggedInMiddlewre, (req, res, next) => {
	req.logout();
	res.sendStatus(200);
});

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

			const update = {
				active: true
			};
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

router.post(`/checkloggedin`, isLoggedInMiddlewre, (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
