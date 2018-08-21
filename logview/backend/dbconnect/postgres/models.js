module.exports = (sequelize, Sequelize) => {
	const models = {
		User: sequelize.import('../../domains/postgres/models/user'),
		Company: sequelize.import('../../domains/postgres/models/company'),
		Setting: sequelize.import('../../domains/postgres/models/setting')
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
