const apiResponse = require('express-api-response'),
	companyService = require('../../services/companyService'),
	baseUrl = '/api/company/';

module.exports = app => {
	app.get(
		baseUrl,
		async (req, res, next) => {
			try {
				const data = await companyService.findAll();
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
				const data = await companyService.findById(req.params.id);
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
				const data = await companyService.create(req.body);
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
				const data = await companyService.update(
					req.params.id,
					req.body
				);
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
		`${baseUrl}:id`,
		async (req, res, next) => {
			try {
				const data = await companyService.update(
					req.params.id,
					req.body
				);
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
				const data = await companyService.delete(req.params.id);
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
