const baseUrl = '/api',
	apiResponse = require('express-api-response'),
	passport = require('passport');
const router = express.Router();

router.post(
	`/login`,
	passport.authenticate('local.signin'),
	(req, res, next) => {
		res.data = req.user.dataValues;
		next();
	},
	apiResponse
);

router.get(
	`/logout`,
	(req, res, next) => {
		req.logout();
		next();
	},
	apiResponse
);

export default router;
