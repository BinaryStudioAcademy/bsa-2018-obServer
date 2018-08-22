const settingRepository = require('../domains/postgres/repositories/settingRepository');

class SettingService {
	create(companyId) {
		const setting = {
			companyId: companyId
		};
		return settingRepository.create(setting);
	}

	findAll() {
		return settingRepository.read();
	}

	findByCompanyId(id) {
		return settingRepository.findByCompanyId(id);
	}

	update(id, newData) {
		return settingRepository.update(id, newData);
	}

	delete(id) {
		return settingRepository.delete(id);
	}
}

module.exports = new SettingService();
