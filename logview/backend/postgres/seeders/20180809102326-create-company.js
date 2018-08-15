const companyService = require('../../services/companyService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data = await generateData();
		const companies = [];
		for (let i = 0; i < data.length; i++) {
			await companyService.create(data[i].name);
		}
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Companies');
	}
};

function generateData() {
	const companies = [
		{ name: 'Binary Studio Academy' },
		{ name: 'Binary Studio Company' }
	];
	return companies;
}
