const {
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PWD,
	POSTGRES_IP,
	DB_DIALECT,
	NODE_ENV
} = process.env;

console.log(`POSTGRES_DB: ${POSTGRES_DB}`);
console.log(`POSTGRES_USER: ${POSTGRES_USER}`);
console.log(`POSTGRES_PWD: ${POSTGRES_PWD}`);
console.log(`POSTGRES_IP: ${POSTGRES_IP}`);
console.log(`DB_DIALECT: ${DB_DIALECT}`);
console.log(`NODE_ENV: ${NODE_ENV}`);

module.exports = {
	development: {
		username: POSTGRES_USER,
		password: POSTGRES_PWD,
		database: POSTGRES_DB,
		host: POSTGRES_IP || 'localhost',
		dialect: DB_DIALECT,
		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',
		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	},
	test: {
		username: POSTGRES_USER,
		password: POSTGRES_PWD,
		database: POSTGRES_DB,
		host: POSTGRES_IP || 'localhost',
		dialect: DB_DIALECT,
		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',
		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	},
	production: {
		username: POSTGRES_USER,
		password: POSTGRES_PWD,
		database: POSTGRES_DB,
		host: POSTGRES_IP || 'localhost',
		dialect: DB_DIALECT,
		migrationStorage: 'json',
		migrationStoragePath: '/sequelize/sequelize_meta.json',
		seederStorage: 'json',
		seederStoragePath: '/sequelize/sequelize_data.json'
	}
};
