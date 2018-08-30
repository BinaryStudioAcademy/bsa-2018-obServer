const fs = require('fs');
const path1 = './sequelize_data.json';
const path2 = './sequelize_meta.json';

fs.writeFile(path1, '[]', err => {
	if (err) console.error(err);
	console.log(`${path1} is clear`);
});

fs.writeFile(path2, '[]', err => {
	if (err) console.error(err);
	console.log(`${path2} is clear`);
});
