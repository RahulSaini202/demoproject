const Customer = require('../models/customer');
// var aws = require('aws-sdk');
// aws.config.loadFromPath('./utils/' + 'awsConfig.json');
// var s3 = new aws.S3();

var customerControllers = {};

/*** Function user register information
 * @param req {Object} the request object 
 * @param res {Object} the response object
 **/
customerControllers.register = (data, res) => {
    var password = data.body.password;
    var customer = new Customer();
    customer.mobile = data.body.mobile,
    customer.lastLogin = Date();
    Customer.findOne({ email: customer.email,isActive:true }, (err, existingUser) => {
        console.log("err", err);
        console.log("existingUser", existingUser)
        if (err) {
            return res.json(500, {
                data: err
            })
        }
        else if (existingUser) {
            return res.json(401, {
                message: "email already exist"
            })
        }
        else {
            customer.save((err, newUser) => {
                if (err) {
                    return res.json(500, {
                        data: err
                    })
                }
                else if (newUser) {
                    return res.json(200, {
                        user: newUser
                    })
                }
            });
        }
    });
}



module.exports = customerControllers;
