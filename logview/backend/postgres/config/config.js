const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, POSTGRES_IP, DB_DIALECT } = process.env;

module.exports = {
	development: {
		username: POSTGRES_USER,
		password: POSTGRES_PWD,
		database: POSTGRES_DB,
		host: POSTGRES_IP,
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
		host: POSTGRES_IP,
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
		host: POSTGRES_IP,
		dialect: DB_DIALECT,

		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',

		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	}
};
