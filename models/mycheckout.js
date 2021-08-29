const mongoose = require('mongoose')
const mycheckout = mongoose.model('mycheckout', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    paymentmethod: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'canceled'],
        default: 'pending'
    },
    productinfo: {
        myproduct: [{
            productname: {
                type: String
            }
        }],
        itemcount: {
            type: String,
        },
        totalamount: {
            type: String
        },

        totalamounttax: {
            type: String
        },

    },

    billingaddress: {
        billingfirstname: {
            type: String
        },
        billinglastname: {
            type: String
        },
        billingphone: {
            type: String
        },
        billingemail: {
            type: String
        },
        billingaddress: {
            type: String
        },
        billingzip: {
            type: String
        },
        billingdistrict: {
            type: String
        },
        billingprovince: {
            type: String
        }
    }

})

module.exports = mycheckout;