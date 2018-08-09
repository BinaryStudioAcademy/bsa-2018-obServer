const Sequelize = require('sequelize');

const user = (sequilize, DataTypes) => {
	const User = sequilize.define(
		'User',
		{
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
			active: {
				type: DataTypes.BOLLEAN,
				defaultValue: false
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
				allowNull: false,
				//delete when company model will exist
				defaultValue: DataTypes.UUIDV4
			}
		} /* , {//add association, when Company model will exist
		classMethods: {
			associate: (models) => {
				User.belongsTo(models.Company), {
					foreignKey: 'companyId',
					onDelete: 'CASCADE'
				}
			}
		}
	} */
	);
	return User;
};

module.exports = user;
