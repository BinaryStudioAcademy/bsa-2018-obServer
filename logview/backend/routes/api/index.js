const user = require('./userRoutes');
const signin = require('./signinRoutes');
const logs = require('./logRoutes');

module.exports = {
	init: app => {
		app.use('/api/user', user);
		app.use('/api/signin', signin);
		app.use('/api/logs', logs);
	}
};
