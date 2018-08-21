module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			resetPasswordToken: {
				type: Sequelize.STRING,
				allowNull: true
			},
			resetPasswordExpires: {
				type: Sequelize.DATE,
				allowNull: true
			},
			userActivationToken: {
				type: Sequelize.STRING,
				allowNull: true
			},
			companyId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				references: {
					model: 'Companies',
					key: 'id'
				},
				allowNull: true
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
		return queryInterface.dropTable('Users');
	}
};
