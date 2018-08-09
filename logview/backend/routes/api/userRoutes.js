const apiResponse = require('express-api-response'),
	passport = require('passport'),
	userRepository = require('../../domains/postgres/repositories/userRepository'),
	passportStrategy = require('../../passport/localStrategy'),
	userService = require('../../services/userService'),
	companyService = require('../../services/companyService'),
	baseUrl = '/api/user/';

module.exports = app => {
	app.get(
		baseUrl,
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

	app.get(
		`${baseUrl}:id`,
		async (req, res, next) => {
			try {
				const data = await userService.findById(req.params.id);
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
		baseUrl,
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

	app.put(
		`${baseUrl}:id`,
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

	app.patch(
		//test on postmen put and patch - works the same way
		`${baseUrl}:id`,
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

	app.delete(
		`${baseUrl}:id`,
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
};
