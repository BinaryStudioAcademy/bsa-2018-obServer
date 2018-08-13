const userService = require('../../services/userService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data = generateData();
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

async function generateData() {
	const academyId = await companyService.findByName('Binary Studio Academy');
	const companyID = await companyService.findByName('Binary Studio Company');
	const data = [
		{
			name: 'Boguslav Barna',
			email: 'boguslavbarna@gmail.com',
			companyID: academyId
		},
		{
			name: 'Bogdan Koldun',
			email: 'koldunbohdan@gmail.com',
			companyID: academyId
		},
		{
			name: 'Dmitriy Beseda',
			email: 'besedadg@gmail.com',
			companyID: companyID
		},
		{
			name: 'Ihor Pankiv',
			email: 'harry.pankiv@gmail.com',
			companyID: academyId
		},
		{
			name: 'Maksym Kostiuk',
			email: 'maksim.kostyuk@binary-studio.com',
			companyID: companyID
		},
		{
			name: 'Nataliia Chernomortseva',
			email: 'natic2471@gmail.com',
			companyID: academyId
		},
		{
			name: 'Volodymyr Vorobets',
			email: 'vvorobets@gmail.com',
			companyID: academyId
		},
		{
			name: 'Yelyzaveta Havrylenko',
			email: 'lizagavrilenkooo@gmail.com',
			companyID: academyId
		},
		{
			name: 'Yuliia Kuznietsova',
			email: 'kuznietsova.j@gmail.com',
			companyID: academyId
		},
		{
			name: 'Taras Dubyk',
			email: 'tarass.dubyk@gmail.com',
			companyID: academyId
		}
	];
	return data;
}
