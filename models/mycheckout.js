const mongoose = require('mongoose')
const mycheckout = mongoose.model('mycheckout', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },

    productinfo: {
        myproduct: [
            {
                productname: {
                    type: String
                },
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                },
                productquantity: {
                    type: Number
                },
                paymentmethod: {
                    type: String,
                },
                status: {
                    type: String,
                    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
                    default: 'Pending'
                },

            }
        ],
        itemcount: {
            type: Number,
        },
        totalamount: {
            type: Number
        },

        totalamounttax: {
            type: Number
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
    },

    checkoutDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mycheckout;