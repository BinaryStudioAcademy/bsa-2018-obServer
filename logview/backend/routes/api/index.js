const user = require('./userRoutes');
const signin = require('./signinRoutes');
const recoveryPassword = require('./recoveryPasswordRoutes');
const logs = require('./logRoutes');

module.exports = {
	init: app => {
		app.use('/api/user', user);
		app.use('/api', signin);
		app.use('/api/logs', logs);
		app.use('/api/user', recoveryPassword);
	}
};
