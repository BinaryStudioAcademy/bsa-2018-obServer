const appService = require('./appService');
const settingService = require('./settingService');
const companyService = require('./companyService');

class CombineSettingService {
	async combineByCompanyId(companyId) {
		const setting = await settingService.findByCompanyId(companyId);
		const apps = await appService.findByCompanyId(companyId);
		const company = await companyService.findById(companyId);

		return {
			filterData: setting,
			apps: apps,
			company: company
		};
	}
}

module.exports = new CombineSettingService();
