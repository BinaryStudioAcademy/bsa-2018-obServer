module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Settings', 'listeningPorts');
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Settings', 'listeningPorts', {
			type: Sequelize.STRING,
			allowNull: true
		});
	}
};
