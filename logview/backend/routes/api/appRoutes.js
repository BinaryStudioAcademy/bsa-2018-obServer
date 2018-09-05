const apiResponse = require('express-api-response');
const router = require('express').Router();
const appService = require('../../services/appService');
const isLoggedInMiddleware = require('../../middleware/isLoggedInMiddleware');

router.get(
	'/',
	isLoggedInMiddleware,
	async (req, res, next) => {
		const companyId = req.user.companyId;
		try {
			const data = await appService.findByCompanyId(companyId);
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

router.post(
	'/',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const data = await appService.create(req.body);
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

router.put(
	'/:id',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const data = await appService.update(req.params.id, req.body);
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

router.delete(
	'/:id',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const data = await appService.delete(req.params.id);
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

module.exports = router;
