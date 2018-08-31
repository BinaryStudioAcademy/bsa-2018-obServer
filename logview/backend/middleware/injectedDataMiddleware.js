const fs = require('fs');
const path = require('path');
const replaceStream = require('replacestream');

module.exports = (req, res, obj, error) => {
	error = error || false;

	populateInjectData(req.user, () => {
		obj = {
			// should be deleted after authorization
			text: 'injectedData'
		};
		if (req.user) {
			obj = req.user;
		}

		res.header = ('Content-Type', 'text/html');
		let indexPath = path.resolve(
			`${__dirname}/../../frontend/index_dev.html`
		);
		if (process.env.NODE_ENV === 'production') {
			indexPath = path.resolve(
				`${__dirname}/../../frontend/index_prod.html`
			);
		}
		console.log(indexPath);
		fs.createReadStream(indexPath)
			.pipe(
				replaceStream(
					'["data_replace"]',
					JSON.stringify(obj)
						.replace(/'/g, "\\'")
						.replace(/\\\"/g, '\\\\"')
				)
			)
			.pipe(
				replaceStream(
					'window._is404Error = false;',
					`window._is404Error = ${error};`
				)
			)
			.pipe(res);
	});

	function populateInjectData(user, mainCallback) {
		mainCallback(null, null);
	}
};
