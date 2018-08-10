const apiResponse = require('express-api-response');
const router = express.Router();

router.get(
	'/',
	(req, res, next) => {
		console.log('DATA LOG!!!');
		res.data = null;
		res.err = null;
		next();
	},
	apiResponse
);

module.exports = router;
