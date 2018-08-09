const apiResponse = require('express-api-response'),
	userService = require('../../services/userService'),
	emailService = require('../../services/emailService'),
	baseUrl = '/api/user',
	RESSET_PASSWORD_EXPIRES = 3600000;

module.exports = app => {
	app.post(
		`${baseUrl}/resetpassword`,
		(req, res, next) => {
			new Promise(async (resolve, reject) => {
				try {
					const token = await userService.generateUserToken();
					resolve(token);
				} catch (err) {
					reject(err);
				}
			})
				.then(token => {
					return new Promise(async (resolve, reject) => {
						const user = await userService.findByEmail(
							req.body.email
						);
						if (!user)
							reject(
								new Error(
									'No account with that email address exists.'
								)
							);
						user.resetPasswordToken = token;
						user.resetPasswordExpires =
							Date.now() + RESSET_PASSWORD_EXPIRES;
						resolve(user);
					});
				})
				.then(user => {
					return new Promise(async (resolve, reject) => {
						try {
							const result = await userService.update(user.id, {
								resetPasswordToken: user.resetPasswordToken,
								resetPasswordExpires: user.resetPasswordExpires
							});
							if (!result)
								throw new Error(
									'Cannot update token in the database.'
								);
							resolve(user);
						} catch (err) {
							reject(err);
						}
					});
				})
				.then(user => {
					return new Promise((resolve, reject) => {
						const msg = {
							subject: 'Password Reset. Observer BSA 2018',
							html: `<p>Hi, ${
								user.name
							}! You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                http://${req.headers.host}/signin/change/?resetToken=${
								user.resetPasswordToken
							}<br>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
						};
						emailService.sendEmail(msg, user.email);
						res.err = null;
						resolve();
						next();
					});
				})
				.catch(err => {
					res.data = null;
					res.err = err;
					next();
				});
		},
		apiResponse
	);

	app.post(
		`${baseUrl}/changepassword/:resetToken`,
		(req, res, next) => {
			new Promise(async (resolve, reject) => {
				const user = await userService.findByResetPasswordToken(
					req.params.resetToken
				);
				if (!user)
					reject(new Error('No account with that token exists.'));
				resolve(user);
			})
				.then(user => {
					return new Promise(async (resolve, reject) => {
						try {
							const expires =
									new Date(
										user.resetPasswordExpires
									).getTime() - Date.now(),
								update = {
									resetPasswordToken: null,
									resetPasswordExpires: null
								};

							if (expires > 0) {
								update.password = await userService.encryptPassword(
									req.body.newPassword
								);
							} else {
								throw new Error(
									`Password reset token has expired.`
								);
							}

							if (!(await userService.update(user.id, update)))
								throw new Error(
									`Cannot update password in the database.`
								);
							resolve(user);
						} catch (err) {
							reject(err);
						}
					});
				})
				.then(user => {
					return new Promise((resolve, reject) => {
						const msg = {
							subject: `Password changed successfully! Observer BSA 2018`,
							html: `This is a confirmation that the password for your account http://${
								req.headers.host
							} has just been changed.`
						};
						emailService.sendEmail(msg, user.email);
						res.err = null;
						resolve();
						next();
					});
				})
				.catch(err => {
					res.data = null;
					res.err = err;
					next();
				});
		},
		apiResponse
	);
};
