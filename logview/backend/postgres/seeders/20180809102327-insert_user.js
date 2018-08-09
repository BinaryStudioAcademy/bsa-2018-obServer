'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: 'test3',
				email: 'test3@gmail.com',
				password: userService.encryptPassword('test3')
			},
			{
				name: 'test4',
				email: 'test4@gmail.com',
				password: userService.encryptPassword('test4')
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};
