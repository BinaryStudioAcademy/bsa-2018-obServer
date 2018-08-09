const password = await require('../../services/userService').encryptPassword(
	'123'
);

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: 'Boguslav Barna',
				email: 'boguslavbarna@gmail.com',
				password: password
			},
			{
				name: 'Bogdan Koldun',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Dmitriy Beseda',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Ihor Pankiv',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Maksym Kostiuk',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Nataliia Chernomortseva',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Taras Dybyk',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Volodymyr Vorobets',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Yelyzaveta Havrylenko',
				email: '@gmail.com',
				password: password
			},
			{
				name: 'Yuliia Kuznietsova',
				email: '@gmail.com',
				password: password
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};
