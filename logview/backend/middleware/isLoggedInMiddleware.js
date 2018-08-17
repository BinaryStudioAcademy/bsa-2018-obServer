module.exports = function(req, res, next) {
	req.isAuthenticated() ? next() : res.sendStatus(401);
};
