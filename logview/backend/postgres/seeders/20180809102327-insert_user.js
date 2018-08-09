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
		return queryInterface.bulkInsert('Users', users);
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
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Dmitriy Beseda',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Ihor Pankiv',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Maksym Kostiuk',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Nataliia Chernomortseva',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Volodymyr Vorobets',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Yelyzaveta Havrylenko',
			email: 'boguslavbarna@gmail.com'
		},
		{
			name: 'Yuliia Kuznietsova',
			email: 'boguslavbarna@gmail.com'
		}
	];
	return data;
}
