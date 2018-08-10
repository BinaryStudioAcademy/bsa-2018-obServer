const companyRepository = require('../domains/postgres/repositories/companyRepository'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto');

class CompanyService {
	constructor() {
		this.saltRounds = 8;
	}

	/** Checks if name contains any of the forbidden symbols [!@#$%^&*]
	 * @param {*} name
	 * In Ukraine:
	 * Найменування юридичної особи не може бути тотожним найменуванню іншої юридичної особи (крім органів місцевого самоврядування).
	 * При написанні найменування юридичної особи використовуються:
	 * - Літери алфавіту;
	 * - Цифри;
	 * - Розділові знаки та символи: лапки (" ", “ ”, „ “, « », які є тотожними), крапка (.), кома (,), двокрапка (:),
	 *  дужки /( )/, апостроф ('), дефіс (-), тире (-), коса риска (/), знак оклику (!), знак питання (?),
	 *  номер (№), плюс (+), знак рівняння (=), зірочка (*), ет комерційна (@).
	 */
	validateName(name) {
		if (!name || name.search(/\S/g) < 0) {
			throw new Error(`The Company's name should not be empty`);
		}
		if (name.search(/[!@#$%^&*]/g) >= 0) {
			throw new Error(
				`In the Company's name is incorrect symbol [!@#$%^&*]`
			);
		}
		return true;
	}

	/**
	 * Creates random unique token for company-database
	 * @param {*} name
	 * 	(!) Needed service to check if company already is in db
	 */
	generateToken() {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(20, (err, buf) => {
				const token = buf.toString('hex');
				if (err) reject(err);
				resolve(token);
			});
		});
	}

	async create(name) {
		if (this.validateName(name)) {
			const newCompany = {};
			newCompany.name = name;
			newCompany.token = await this.generateToken(name);
			return companyRepository.create(newCompany);
		}
	}

	findAll() {
		return companyRepository.read();
	}

	findById(id) {
		return companyRepository.findById(id);
	}

	update(id, newData) {
		return companyRepository.update(id, newData);
	}

	delete(id) {
		return companyRepository.delete(id);
	}
}

module.exports = new CompanyService();
