const apiResponse = require('express-api-response'),
	isLoggedInMiddleware = require('../../middleware/isLoggedInMiddleware'),
	isAdminMiddleware = require('../../middleware/isAdminMiddleware'),
	userService = require('../../services/userService'),
	emailService = require('../../services/emailService'),
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

			eventEmitter.emit('update company settings', setting);

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

module.exports = router;
