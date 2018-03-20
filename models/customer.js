const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var autoIncrement = require('mongoose-auto-increment');
var date = new Date();

console.log(date.toLocaleDateString())



/*** Model for the user collection.*
 *  It is used to perform any db operations on user collection*
 *  @module models/customer*/

var customerSchema = new Schema({
    email: { type: String, required: false, },
    // userName: {
    //     type: String,
    //     trim: true,
    //     default:""
    // },
    password: String,
    facebook: {
        id: { type: String, required: false }
    },
    google: {
        id: { type: String, required: false }
    },
    passwordResetToken: { type: String, },
    passwordResetExpires: Date,
    address: [{
        city:  { type: String, default: "" },
       pincode:{type:String,default:""},
        state:  { type: String, default: "" },
      mobile: Number,
        firstName:  { type: String, default: "" },
        middleName:  { type: String, default: "" },
        lastName: { type: String, default: "" },
        country:  { type: String, default: "" },
        address:  { type: String, default: "" },
        isDefaultAddress: { type: Boolean, default: true },
        locality:  { type: String, default: "" },
    }],
    billingAddress: [{
        city: { type: String, default: "" },
        landmark: { type: String, default: "" },
         pincode:{type:String,default:""},
        state:  { type: String, default: "" },
        street: { type: String, default: "" },
        mobile: { type: String, default: "" },
        prefix: { type: String, default: "" },
        firstName:  { type: String, default: "" },
        middleName:  { type: String, default: "" },
        lastName: { type: String, default: "" },
        fax:  { type: String, default: "" },
        country: { type: String, default: "" },
        company: { type: String, default: "" },
    }],
    shippingAddress: [{
        city:  { type: String, default: "" },
        landmark:  { type: String, default: "" },
         pincode:{type:String,default:""},
        state:  { type: String, default: "" },
        street:  { type: String, default: "" },
        mobile: Number,
        prefix:  { type: String, default: "" },
        firstName:  { type: String, default: "" },
        middleName: { type: String, default: "" },
        lastName:  { type: String, default: "" },
        fax: { type: String, default: "" },
        country:  { type: String, default: "" },
        company: { type: String, default: "" },
    }],
    bifocalPrescription: {
        axis: { left: { near: { type: String,default:"0" }, distance: { type: String,default:"0" } }, right: { near: { type: String,default:"0" }, distance: { type: String, default:"0"} } },
        cyl: { left: { near: { type: String, default:"0"}, distance: { type: String,default:"0" } }, right: { near: { type: String,default:"0" }, distance: { type: String,default:"0" } } },
        sph: { left: { near: { type: String,default:"0" }, distance: { type: String,default:"0" } }, right: { near: { type: String,default:"0" }, distance: { type: String,default:"0" } } },
        additional: { left: { near: { type: String,default:"" }, distance: { type: String,default:"" } }, right: { near: { type: String,default:""}, distance: { type: String,default:"" } } },
    },
    singleVisionPrescription: {
        leftEye: {
            sphPower: { type: String,default:"0" },
            cylPower: { type: String,default:"0" },
            axis: { type: String,default:"0"},
            additional: { type: String,default:"" },
        },
        rightEye: {
            sphPower: { type: String ,default:"0"},
            cylPower: { type: String,default:"0" },
            axis: { type: String,default:"0" },
            additional: { type: String,default:"" },
        }
    },
    prescriptionImage: [{
        uploadImageName: { type: String, required: false }, //Return uploaded image Url from AWS
        status: { type: String, required: false }
    }],
    mainWebsite: { type: String, default: "" },
    prefix: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    gender: { type: String, default: "" },
    mobile: { type: String, default: "" },
    dob: { type: String, default: "" },
    suffix: { type: String, default: "" },
    group: { type: String, default: "General"},
    lastLogin: { type: Date },
    createDate: { type: String, default: date.toLocaleDateString() },
    order: Number,
    sendEmail: { type: Boolean, default: false },
    isActive: {
        type: Boolean,
        default: true
    },
    seq: { type: Number }
},
    {
        timestamps: { createdAt: 'createdAt', lastUpdated: 'lastUpdated' }
    });


customerSchema.pre('save', function (next) {
    if (!this.isModified('lastUpdated')) this.lastUpdated = new Date;
    next();
});

// customerSchema.plugin(autoIncrement.plugin, { model: 'Customer', field: 'seq', startAt: 1 });

module.exports = mongoose.model('Customer', customerSchema);
