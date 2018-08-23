const apiResponse = require('express-api-response'),
	isLoggedInMiddlewre = require('../../middleware/isLoggedInMiddleware'),
	userService = require('../../services/userService'),
	emailService = require('../../services/emailService'),
	companyService = require('../../services/companyService');
(settingService = require('../../services/settingService')),
	(router = require('express').Router()),
	(RESSET_PASSWORD_EXPIRES = 3600000);

router.get(
	'/',
	async (req, res, next) => {
		try {
			const data = await userService.findAll();
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

router.get(
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.findById(req.params.id);
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
	async (req, res, next) => {
		try {
			const data = await userService.create(req.body);
			const msg = {
				subject: 'Confirm email address. Observer BSA 2018',
				html: `<p>You are receiving this because you (or someone else) have requested the registration new account.</p>
		               <p>Please click on the following link, or paste this into your browser to complete the activation:</p>
		               <p>http://${req.headers.host}/confirm/?activationToken=${
					data.userActivationToken
				}</p>
		               <p>If you did not request this, please ignore this email.</p>`
			};
			emailService.sendEmail(msg, data.email);
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
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.update(req.params.id, req.body);
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
	'/current/loggedin',
	isLoggedInMiddlewre,
	async (req, res, next) => {
		try {
			const data = await userService.update(req.user.id, req.body);
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
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.delete(req.params.id);
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
	'/resetpassword',
	async (req, res, next) => {
		try {
			const token = await userService.generateUserToken();
			const user = await userService.findByEmail(req.body.email);
			if (!user) {
				res.shouldNotHaveData = false;
				res.failureStatus = 404;
				throw new Error('No account with that email address exists.');
			}

			const result = await userService.update(user.id, {
				resetPasswordToken: token,
				resetPasswordExpires: Date.now() + RESSET_PASSWORD_EXPIRES
			});
			if (!result)
				throw new Error('Cannot update token in the database.');
			const msg = {
				subject: 'Password Reset. Observer BSA 2018',
				html: `<p>Hi, ${
					user.name
				}! You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
		               <p>Please click on the following link, or paste this into your browser to complete the process:</p>
		               <p>http://${req.headers.host}/change/?resetToken=${token}</p>
		               <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
			};
			emailService.sendEmail(msg, user.email);
			res.shouldNotHaveData = false;
			res.failureStatus = 200;
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
	'/changepassword/:resetToken',
	async (req, res, next) => {
		try {
			const user = await userService.findByResetPasswordToken(
				req.params.resetToken
			);
			if (!user) {
				res.shouldNotHaveData = false;
				res.failureStatus = 404;
				throw new Error('No account with that token exists.');
			}

			const expires =
				new Date(user.resetPasswordExpires).getTime() - Date.now();
			const update = {
				resetPasswordToken: null,
				resetPasswordExpires: null
			};

			if (expires > 0) {
				update.password = await userService.encryptPassword(
					req.body.newPassword
				);
			} else {
				throw new Error(`Password reset token has expired.`);
			}

			if (!(await userService.update(user.id, update)))
				throw new Error(`Cannot update password in the database.`);

			const msg = {
				subject: `Password changed successfully! Observer BSA 2018`,
				html: `This is a confirmation that the password for your account http://${
					req.headers.host
				} has just been changed.`
			};
			emailService.sendEmail(msg, user.email);
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
	'/invite',
	isLoggedInMiddlewre,
	async (req, res, next) => {
		try {
			await userService.invite(req);
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

router.post(
	'/invite/:inviteToken',
	async (req, res, next) => {
		try {
			await userService.activateByInvite(req);
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
	'/company/users',
	isLoggedInMiddlewre,
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

router.get(
	'/current/loggedin',
	isLoggedInMiddlewre,
	async (req, res, next) => {
		try {
			const dataUser = await userService.findById(req.user.id);
			const dataCompany = await companyService.findById(
				req.user.companyId
			);
			res.data = {
				name: dataUser.name,
				email: dataUser.email,
				companyId: dataUser.companyId,
				company: dataCompany.name
			};
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
	'/company/settings',
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
	'/company/settings',
	async (req, res, next) => {
		try {
			const settingId = (await settingService.findByCompanyId(
				req.user.companyId
			)).id;
			await settingService.update(settingId, req.body);
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

module.exports = router;
