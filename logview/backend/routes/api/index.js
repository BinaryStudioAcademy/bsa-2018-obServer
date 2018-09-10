const user = require('./userRoutes');
const signin = require('./signinRoutes');
const logs = require('./logRoutes');
const company = require('./companyRoutes');
const appRoutes = require('./appRoutes');

module.exports = {
	init: app => {
		app.use('/api/user', user);
		app.use('/api', signin);
		app.use('/api/logs', logs);
		app.use('/api/user/company', company);
		app.use('/api/app', appRoutes);
	}
};
