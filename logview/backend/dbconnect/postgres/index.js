const Sequelize = require('sequelize');
const {
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PWD,
	POSTGRES_EXTERNAL_PORT,
	POSTGRES_IP,
	DB_DIALECT
} = process.env;

console.log(`------------------------------------- dbConnect`);
console.log(`POSTGRES_DB: ${POSTGRES_DB}`);
console.log(`POSTGRES_USER: ${POSTGRES_USER}`);
console.log(`POSTGRES_PWD: ${POSTGRES_PWD}`);
console.log(`POSTGRES_IP: ${POSTGRES_IP}`);
console.log(`DB_DIALECT: ${DB_DIALECT}`);

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, {
	host: POSTGRES_IP || 'localhost',
	dialect: DB_DIALECT,
	operatorsAliases: false,
	port: POSTGRES_EXTERNAL_PORT || 5432,
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
