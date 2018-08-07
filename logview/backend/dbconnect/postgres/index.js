const Sequelize = require('sequelize');
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD } = process.env;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, {
	host: 'localhost',
	dialect: 'postgres',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		const context = require('../../units/context');
		context.sequelize = sequelize;
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const models = require('./models')(sequelize, Sequelize);

module.exports = models;
