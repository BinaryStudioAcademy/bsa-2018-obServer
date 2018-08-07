const apiResponse = require('express-api-response'),
	passport = require('passport'),
	userRepository = require('../../domains/postgres/repositories/userRepository'),
	userService = require('../../services/userService');

module.exports = app => {
	app.get(
		'/user',
		async (req, res, next) => {
			try {
				const data = await userRepository.read();
				res.data = data;
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

	app.post(
		'/user',
		async (req, res, next) => {
			try {
				const data = await userService.create(req.body);
				res.data = data;
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

	app.delete(
		'/user/:id',
		async (req, res, next) => {
			try {
				const data = await userService.delete(req.params.id);
				res.data = data;
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

	app.patch(
		'/user/:id',
		async (req, res, next) => {
			try {
				const data = await userService.update(req.params.id, req.body);
				res.data = data;
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

	app.post(
		'/signin',
		passport.authenticate('local.signin'),
		(req, res, next) => {
			console.log(res);
		},
		apiResponse
	);

	app.post(
		'/signup',
		passport.authenticate('local.signup'),
		(req, res, next) => {},
		apiResponse
	);

	//FOR TEST USER FIND OPERATIONS
	app.get(
		'/user/:id',
		async (req, res, next) => {
			try {
				const data = await userService.findByEmail(req.params.id);
				res.data = data;
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
};
