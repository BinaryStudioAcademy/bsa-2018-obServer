const userService = require('../../services/userService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data = createData();
		const users = [];
		for (let i = 0; i < 10; i++) {
			users.push(
				await userService.create({
					name: data[i].name,
					password: 123,
					email: data[i].email
				})
			);
		}
		// return queryInterface.bulkInsert('Users', users);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};

function createData() {
	const data = [
		{
			name: 'Boguslav Barna',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Bogdan Koldun',
			email: 'koldunbohdan@gmail.com'
		},
		{
			name: 'Dmitriy Beseda',
			email: 'besedadg@gmail.com'
		},
		{
			name: 'Ihor Pankiv',
			email: 'harry.pankiv@gmail.com'
		},
		{
			name: 'Maksym Kostiuk',
			email: 'maksim.kostyuk@binary-studio.com'
		},
		{
			name: 'Nataliia Chernomortseva',
			email: 'natic2471@gmail.com'
		},
		{
			name: 'Volodymyr Vorobets',
			email: 'vvorobets@gmail.com'
		},
		{
			name: 'Yelyzaveta Havrylenko',
			email: 'lizagavrilenkooo@gmail.com'
		},
		{
			name: 'Yuliia Kuznietsova',
			email: 'kuznietsova.j@gmail.com'
		},
		{
			name: 'Taras Dubyk',
			email: 'tarass.dubyk@gmail.com'
		}
	];
	return data;
}
