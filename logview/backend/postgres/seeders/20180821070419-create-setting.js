const companyService = require('../../services/companyService');
const settingService = require('../../services/settingService');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const BSA_id = (await companyService.findByName(
			'Binary Studio Academy'
		)).dataValues.id;
		const BSC_id = (await companyService.findByName(
			'Binary Studio Company'
		)).dataValues.id;
		await settingService.create(BSA_id);
		await settingService.create(BSC_id);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Companies');
	}
};
