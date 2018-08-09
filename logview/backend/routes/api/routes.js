module.exports = app => {
	return {
		signinRoutes: require('./signinRoutes')(app),
		userRoutes: require('./userRoutes')(app),
		userRoutes: require('./recoveryPswdRouters')(app),
		logRoutes: require('./logRoutes')
	};
};
