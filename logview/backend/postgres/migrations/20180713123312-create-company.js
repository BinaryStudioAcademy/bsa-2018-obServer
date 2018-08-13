module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Companies', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Date.now()
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Date.now()
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Companies');
	}
};
