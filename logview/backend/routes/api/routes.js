module.exports = app => {
	return {
		signinRoutes: require('./signinRoutes')(app),
		userRoutes: require('./userRoutes')(app),
		userRoutes: require('./recoveryPasswordRoutes')(app),
		logRoutes: require('./logRoutes')
	};
};
