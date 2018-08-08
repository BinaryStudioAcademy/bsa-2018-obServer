module.exports = app => {
	return {
		signinRoutes: require('./signinRoutes')(app),
		userRoutes: require('./userRoutes')(app),
		companyRoutes: require('./companyRoutes')(app),
		logRoutes: require('./logRoutes')
	};
};
