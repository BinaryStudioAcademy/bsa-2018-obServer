const userService = require('../../services/userService');
const userRepository = require('../../domains/postgres/repositories/userRepository');
const companyService = require('../../services/companyService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data = await generateData();
		for (let i = 0; i < data.length; i++) {
			await userRepository.create({
				name: data[i].name,
				password: 123,
				email: data[i].email,
				companyId: data[i].companyId
			});
		}
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};

async function generateData() {
	const academy = await companyService.findByName('Binary Studio Academy');
	const company = await companyService.findByName('Binary Studio Company');
	console.log(`\n\n\nacademyId:${academy.id}`);
	console.log(`\n\n\nacademy:${academy}`);
	const data = [
		{
			name: 'Boguslav Barna',
			email: 'boguslavbarna@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Bogdan Koldun',
			email: 'koldunbohdan@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Dmitriy Beseda',
			email: 'besedadg@gmail.com',
			companyId: company.id
		},
		{
			name: 'Ihor Pankiv',
			email: 'harry.pankiv@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Maksym Kostiuk',
			email: 'maksim.kostyuk@binary-studio.com',
			companyId: company.id
		},
		{
			name: 'Nataliia Chernomortseva',
			email: 'natic2471@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Volodymyr Vorobets',
			email: 'vvorobets@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Yelyzaveta Havrylenko',
			email: 'lizagavrilenkooo@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Yuliia Kuznietsova',
			email: 'kuznietsova.j@gmail.com',
			companyId: academy.id
		},
		{
			name: 'Taras Dubyk',
			email: 'tarass.dubyk@gmail.com',
			companyId: academy.id
		}
	];
	return data;
}
