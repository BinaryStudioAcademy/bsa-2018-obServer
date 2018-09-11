const Sequelize = require('sequelize');

const company = (sequilize, DataTypes) => {
	const Company = sequilize.define('Company', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		logcollectAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		logcollectPort: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});
	return Company;
};

module.exports = company;
