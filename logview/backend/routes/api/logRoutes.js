const apiResponse = require('express-api-response');

module.exports = app => {
	app.get(
		'/log',
		(req, res, next) => {
			console.log('DATA LOG!!!');
			res.data = null;
			res.err = null;
			next();
		},
		apiResponse
	);
};
