module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Apps', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			port: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			companyId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'Companies',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Apps');
	}
};
