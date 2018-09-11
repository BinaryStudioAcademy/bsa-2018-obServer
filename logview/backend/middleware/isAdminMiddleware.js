module.exports = function(req, res, next) {
	req.user.admin ? next() : res.sendStatus(403);
};
