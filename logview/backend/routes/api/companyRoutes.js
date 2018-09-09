const apiResponse = require('express-api-response'),
	isLoggedInMiddleware = require('../../middleware/isLoggedInMiddleware'),
	isAdminMiddleware = require('../../middleware/isAdminMiddleware'),
	userService = require('../../services/userService'),
	companyService = require('../../services/companyService');
(settingService = require('../../services/settingService')),
	(router = require('express').Router()),
	(RESSET_PASSWORD_EXPIRES = 3600000);

const eventEmitter = require('../../events');

router.get(
	'/users',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const data = await userService.findUsersOfCompany(
				req.user.companyId
			);
			res.data = data;
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

router.put(
	'/users/changerights',
	isLoggedInMiddleware,
	isAdminMiddleware,
	async (req, res, next) => {
		try {
			await userService.changeUserRights(req);
			res.shouldNotHaveData = false;
			res.failureStatus = 200;
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

router.delete(
	'/users',
	isLoggedInMiddleware,
	isAdminMiddleware,
	async (req, res, next) => {
		try {
			await userService.deleteUserFromCompany(req);
			res.shouldNotHaveData = false;
			res.failureStatus = 200;
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

router.get(
	'/settings',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const setting = await settingService.findByCompanyId(
				req.user.companyId
			);
			res.data = setting;
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

router.put(
	'/settings',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const settingId = (await settingService.findByCompanyId(
				req.user.companyId
			)).id;
			await settingService.update(settingId, req.body);
			const setting = await settingService.findByCompanyId(
				req.user.companyId
			);
			eventEmitter.emit('update company settings', req.user.companyId);

			res.data = setting;
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

router.get(
	'/server',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			const company = await companyService.findById(req.user.companyId);
			res.data = company;
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

router.put(
	'/server',
	isLoggedInMiddleware,
	async (req, res, next) => {
		try {
			await companyService.update(req.user.companyId, req.body);
			const company = await companyService.findById(req.user.companyId);
			eventEmitter.emit('update company settings', req.user.companyId);

			res.data = company;
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
