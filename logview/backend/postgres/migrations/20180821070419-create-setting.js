module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Settings', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			serverMemory: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			serverCPU: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			appsMemory: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			appsCPU: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			appsHttp: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			appsSoket: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			appsErrorLog: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			listeningPorts: {
				type: Sequelize.STRING,
				allowNull: true
			},
			notificationServerIsDown: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			notificationHighRequest: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			companyId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Companies',
					key: 'id'
				}
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeTable('Settings');
	}
};
