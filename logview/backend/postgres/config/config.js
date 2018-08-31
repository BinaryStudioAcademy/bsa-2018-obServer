const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD } = process.env;

module.exports = {
	development: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PWD,
		database: process.env.POSTGRES_DB,
		host: process.env.HOST,
		dialect: process.env.DB_DIALECT,

		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',

		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	},
	test: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PWD,
		database: process.env.POSTGRES_DB,
		host: process.env.HOST,
		dialect: process.env.DB_DIALECT,

		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',

		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	},
	production: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PWD,
		database: process.env.POSTGRES_DB,
		host: process.env.HOST,
		dialect: process.env.DB_DIALECT,

		migrationStorage: 'json',
		migrationStoragePath: 'sequelize_meta.json',

		seederStorage: 'json',
		seederStoragePath: 'sequelize_data.json'
	}
};
