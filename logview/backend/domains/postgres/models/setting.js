const Sequelize = require('sequelize');

const settings = (sequilize, DataTypes) => {
	const Settings = sequilize.define(
		'Setting',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			serverMemory: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			serverCPU: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsMemory: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsCPU: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsHttp: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsSoket: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsErrorLog: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			listeningPorts: {
				type: DataTypes.STRING,
				allowNull: true
			},
			notificationServerIsDown: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			notificationHighRequest: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			companyId: {
				type: DataTypes.UUID,
				allowNull: false
			}
		},
		{
			classMethods: {
				associate: models => {
					User.belongsTo(models.Company),
						{
							foreignKey: 'companyId',
							onUpdate: 'CASCADE',
							onDelete: 'CASCADE'
						};
				}
			}
		}
	);
	return Settings;
};

module.exports = settings;