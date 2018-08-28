const apiResponse = require('express-api-response');
const axios = require('axios');
const router = require('express').Router();
const aggregatedStoragePort = process.env.AGGREGATEDSTORAGE_PORT || 3100;

router.get(
	'/',
	async (req, res, next) => {
		const headers = {
			'X-COMPANY-TOKEN': req.header('X-COMPANY-TOKEN')
		};

		if (req.header('X-APP-ID')) {
			headers['X-APP-ID'] = req.header('X-APP-ID');
		}

		const logIntervals = req.query;

		const logs = await axios
			.get(`http://localhost:${aggregatedStoragePort}/api/logs`, {
				headers: headers,
				params: logIntervals
			})
			.then(response => response.data)
			.catch(err => (res.err = err));

		res.data = logs;

		next();
	},
	apiResponse
);

module.exports = router;
