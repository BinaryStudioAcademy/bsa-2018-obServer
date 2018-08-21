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
				allowNull: false,
				defaultValue: true
			},
			serverCPU: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsMemory: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsCPU: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsHttp: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsSoket: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			appsErrorLog: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			listeningPorts: {
				type: Sequelize.STRING,
				allowNull: true
			},
			notificationServerIsDown: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			notificationHighRequest: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
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
		return queryInterface.removeTable('Settings');
	}
};
