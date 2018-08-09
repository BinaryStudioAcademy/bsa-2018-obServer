const apiResponse = require('express-api-response'),
	baseUrl = `/api/log/`;

module.exports = app => {
	app.get(
		baseUrl,
		(req, res, next) => {
			console.log('DATA LOG!!!');
			res.data = null;
			res.err = null;
			next();
		},
		apiResponse
	);
};
