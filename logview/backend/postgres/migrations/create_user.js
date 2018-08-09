'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			resetPasswordToken: {
				type: DataTypes.STRING,
				allowNull: true
			},
			resetPasswordExpires: {
				type: DataTypes.DATE,
				allowNull: true
			},
			companyId: {
				//add reference when Company will exist
				type: DataTypes.UUID,
				allowNull: false,
				//delete when company model will exist
				defaultValue: DataTypes.UUIDV4
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
