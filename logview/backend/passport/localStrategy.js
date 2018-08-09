const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	userService = require('../services/userService');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	userService
		.findById(id)
		.then(user => done(null, user))
		.catch(err => done(err));
});

passport.use(
	'local.signin',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		(username, password, done) => {
			userService
				.findByEmail(username)
				.then(async user => {
					if (!user)
						return done(null, false, { message: 'Wrong username' });
					if (
						!(await userService.validPassword(
							password,
							user.password
						))
					)
						return done(null, false, { message: 'Wrong password' });
					console.log(`USER: ${user}`);
					return done(null, user);
				})
				.catch(err => {
					return done(err);
				});
		}
	)
);