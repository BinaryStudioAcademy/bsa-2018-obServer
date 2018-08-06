const user = (sequilize, DataTypes) => {
	const User = sequilize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return User;
};

module.exports = user;
