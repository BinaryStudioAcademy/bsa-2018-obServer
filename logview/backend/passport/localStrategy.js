const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	userService = require('../services/userService');

passport.serializeUser((user, done) => {
	done(null, user._id);
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
			passwordField: 'password',
			session: true
		},
		(username, password, done) => {
			console.log(`username: ${username}`);
			console.log(`password: ${password}`);
			userService.findByEmail(username).then((err, user) => {
				if (err) return done(err);
				if (!user)
					return done(null, false, { message: 'Wrong username' });
				if (!userService.validPassword(password, user.password))
					return done(null, false, { message: 'Wrong password' });
				return done(null, user);
			});
		}
	)
);

// passport.use(
// 	'local.signup',
// 	new LocalStrategy(
// 		{
// 			usernameField: 'email',
// 			passReqToCallback: true
// 		},
// 		(req, username, password, done) => {}
// 	)
// );
