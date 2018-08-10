module.exports = (sequelize, Sequelize) => {
	const models = {
		User: sequelize.import('../../domains/postgres/models/user'),
		Company: sequelize.import('../../domains/postgres/models/company')
	};

	Object.keys(models).forEach(key => {
		if ('associate' in models[key]) {
			models[key].associate(models);
		}
	});

	models.sequelize = sequelize;
	models.Sequelize = Sequelize;

	return models;
};
