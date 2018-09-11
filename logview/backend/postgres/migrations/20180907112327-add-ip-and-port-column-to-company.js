module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface
			.addColumn('Companies', 'logcollectAddress', {
				type: Sequelize.STRING,
				allowNull: true
			})
			.then(() => {
				return queryInterface.addColumn('Companies', 'logcollectPort', {
					type: Sequelize.STRING,
					allowNull: true
				});
			});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface
			.removeColumn('Companies', 'logcollectAddress')
			.then(() => {
				return queryInterface.removeColumn(
					'Companies',
					'logcollectPort'
				);
			});
	}
};
