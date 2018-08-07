const apiResponse = require('express-api-response');
const userRepository = require('../../domains/postgres/repositories/userRepository');

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
				const data = await userRepository.create(req.body);
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
