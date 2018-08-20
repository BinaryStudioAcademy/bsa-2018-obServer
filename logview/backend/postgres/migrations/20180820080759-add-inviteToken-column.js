module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'inviteToken', {
			type: Sequelize.STRING,
			allowNull: true
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Users', 'inviteToken');
	}
};
