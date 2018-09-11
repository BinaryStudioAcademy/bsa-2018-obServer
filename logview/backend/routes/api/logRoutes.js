const apiResponse = require('express-api-response');
const axios = require('axios');
const router = require('express').Router();
const aggregatedStoragePort = process.env.AGGREGATEDSTORAGE_PORT || 3100;
const aggregatedStorageHost = process.env.AGGREGATEDSTORAGE_HOST || 'localhost';

router.get(
	'/',
	async (req, res, next) => {
		try {
			const headers = {
				'X-COMPANY-TOKEN': req.user.companyId
			};

			if (req.header('X-APP-ID')) {
				headers['X-APP-ID'] = req.header('X-APP-ID');
			}

			const logIntervals = req.query;

			const logs = await axios
				.get(
					`http://${aggregatedStorageHost}:${aggregatedStoragePort}/api/logs`,
					{
						headers: headers,
						params: logIntervals
					}
				)
				.then(response => response.data);

			res.data = logs;
			res.err = null;
		} catch (error) {
			res.data = null;
			res.err = error;
		} finally {
			next();
		}
	},
	apiResponse
);

module.exports = router;
