'use strict';

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
			companyId: {
				//add reference when Company will exist
				type: Sequelize.UUID,
				allowNull: false,
				//delete when company model will exist
				defaultValue: Sequelize.UUIDV4
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
