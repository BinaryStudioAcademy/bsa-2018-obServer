const apiResponse = require('express-api-response');
const router = require('express').Router();
const appService = require('../../services/appService');
const isLoggedInMiddleware = require('../../middleware/isLoggedInMiddleware');
const eventEmitter = require('../../events');

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
			const companyId = req.user.companyId;
			const data = await appService.create({
				companyId: companyId,
				name: req.body.name,
				port: req.body.port
			});
			eventEmitter.emit('update company settings', req.user.companyId);

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
			eventEmitter.emit('update company settings', req.user.companyId);

			res.data = {
				id: req.params.id,
				name: req.body.name,
				port: req.body.port
			};
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
			eventEmitter.emit('update company settings', req.user.companyId);

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
