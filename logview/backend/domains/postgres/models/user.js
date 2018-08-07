const Sequelize = require('sequelize');
const user = (sequilize, DataTypes) => {
	const User = sequilize.define('User', {
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
			type: DataTypes.UUID,
			allowNull: true
		}
	});
	return User;
};

module.exports = user;
