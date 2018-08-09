const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD } = process.env;

module.exports = {
	development: {
		username: POSTGRES_USER,
		password: POSTGRES_PWD,
		database: POSTGRES_DB,
		host: 'localhost',
		dialect: 'postgres',

		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',

		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	},
	test: {
		username: 'database_test',
		password: 'database_test',
		database: 'database_test',
		host: 'localhost',
		dialect: 'postgres'
	},
	production: {
		username: 'database_prod',
		password: 'database_prod',
		database: 'database_prod',
		host: 'localhost',
		dialect: 'postgres'
	}
};
