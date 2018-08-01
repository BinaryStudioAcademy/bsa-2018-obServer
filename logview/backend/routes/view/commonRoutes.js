const apiResponse = require('express-api-response');
const injectedData = require('../../middleware/injectedDataMiddleware');

module.exports = (app) => {
    app.get('*', (req, res, next) => {
        injectedData(req, res, {}, false);
        console.log('Request from: ');
        console.log(req.user);
    }, apiResponse);
}