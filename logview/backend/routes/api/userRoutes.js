const apiResponse = require('express-api-response'),
	userService = require('../../services/userService');
const router = express.Router();

router.get(
	'/',
	async (req, res, next) => {
		try {
			const data = await userService.read();
			res.data = data;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

router.get(
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.findById(req.params.id);
			res.data = data;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

router.post(
	'/',
	async (req, res, next) => {
		try {
			const data = await userService.create(req.body);
			res.data = data;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

router.put(
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.update(req.params.id, req.body);
			res.data = data;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

router.delete(
	`/:id`,
	async (req, res, next) => {
		try {
			const data = await userService.delete(req.params.id);
			res.data = data;
			res.err = null;
		} catch (err) {
			res.data = null;
			res.err = err;
		} finally {
			next();
		}
	},
	apiResponse
);

module.exports = router;
