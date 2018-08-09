module.exports = app => {
	return {
		signinRoutes: require('./signinRoutes')(app),
		userRoutes: require('./userRoutes')(app),
		logRoutes: require('./logRoutes')
	};
};
