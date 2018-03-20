const customer = require('./customer');

module.exports = function (app) {
	
	app.use('/customer', customer)
	
}

