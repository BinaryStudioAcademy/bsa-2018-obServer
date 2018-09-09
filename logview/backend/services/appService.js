const appRepository = require('../domains/postgres/repositories/appRepository');

class AppService {
	create(body) {
		return appRepository.create(body);
	}

	findAll() {
		return appRepository.read();
	}

	findByCompanyId(companyId) {
		return appRepository.findByCompanyId(companyId);
	}

	update(id, newData) {
		return appRepository.update(id, newData);
	}

	delete(id) {
		return appRepository.delete(id);
	}
}

module.exports = new AppService();
