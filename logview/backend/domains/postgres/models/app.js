const Sequelize = require('sequelize');

const app = (sequilize, DataTypes) => {
	const App = sequilize.define(
		'App',
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
			companyId: {
				type: DataTypes.UUID,
				allowNull: false
			}
		},
		{
			classMethods: {
				associate: models => {
					Setting.belongsTo(models.Company),
						{
							foreignKey: 'companyId',
							onUpdate: 'CASCADE',
							onDelete: 'CASCADE'
						};
				}
			}
		}
	);
	return App;
};

module.exports = app;
