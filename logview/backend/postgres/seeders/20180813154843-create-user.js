const userService = require('../../services/userService');
const userRepository = require('../../domains/postgres/repositories/userRepository');
const companyService = require('../../services/companyService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data = await generateData();
		for (let i = 0; i < data.length; i++) {
			await userRepository.create({
				name: data[i].name,
				password: await userService.encryptPassword('12345678'),
				email: data[i].email,
				active: true,
				companyId: data[i].companyId,
				admin: data[i].admin ? true : false
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
	const data = [
		{
			name: 'Boguslav Barna',
			email: 'boguslavbarna@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		},
		{
			name: 'Bogdan Koldun',
			email: 'koldunbohdan@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		},
		// {
		// 	name: 'Dmitriy Beseda',
		// 	email: 'besedadg@gmail.com',
		// 	companyId: company.id,
		// 	userActivationToken: null
		// },
		{
			name: 'Ihor Pankiv',
			email: 'harry.pankiv@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		},
		{
			name: 'Maksym Kostiuk',
			email: 'maksim.kostyuk@binary-studio.com',
			companyId: company.id,
			userActivationToken: null,
			admin: true
		},
		{
			name: 'Nataliia Chernomortseva',
			email: 'natic2471@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		},
		{
			name: 'Volodymyr Vorobets',
			email: 'vvorobets@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		},
		{
			name: 'Yelyzaveta Havrylenko',
			email: 'lizagavrilenkooo@gmail.com',
			companyId: academy.id,
			userActivationToken: null
		},
		{
			name: 'Yuliia Kuznietsova',
			email: 'kuznietsova.j@gmail.com',
			companyId: academy.id,
			userActivationToken: null
		},
		{
			name: 'Taras Dubyk',
			email: 'tarass.dubyk@gmail.com',
			companyId: academy.id,
			userActivationToken: null,
			admin: true
		}
	];
	return data;
}
