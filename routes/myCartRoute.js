const express = require('express');
const router = express.Router();
const mycart = require('../models/mycart');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const GadgetCart = require('../models/mycart');
const mycheckout = require('../models/mycheckout');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/mycart/insert',
    function (req, res) {

        const { userid, productid, quantity, productname, productprice, producttype, productimage } = req.body;
        mycart.find({ userid })
            .then(function (data) {
                if (data.length == 0) {
                    const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype, productimage });

                    return cart_id.save()
                        .then(function (result) {
                            res.status(201).json({
                                message: "cart Added",
                                success: true
                            })
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                message: err,
                                success: false
                            })
                        });
                }

                var findCart = data.find(cart => {
                    if (cart.productid == productid) {
                        return cart._id
                    }
                })

                if (findCart) {
                    return res.status(302).json({
                        message: "Already Added.",
                        success: true
                    })
                }
                else {
                    const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype, productimage });

                    return cart_id.save()
                        .then(function (result) {
                            res.status(201).json({
                                message: "cart Added",
                                success: true
                            })
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                message: err,
                                success: false
                            })
                        });
                }
            })
            .catch(function (err) {
                res.status(404).json({ // 500 internal server error
                    success: false,
                    message: "User Not Found",
                    error: err
                });
            })
    })


router.get('/mycart/one/:id', function (req, res) {
    const mycart = req.params.id
    mycart.find({ productid: mycart })
        .then(function (data) {
            res.status(200).json({ data: data });

        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/mycart/showall', function (req, res) {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, "secretKey");
    const addedBy = decode.userId

    mycart.find({ userid: addedBy })
        .then(function (mycart_data) {
            res.status(200).json({
                success: true,
                data: mycart_data,
                count: mycart_data.length
            });
            // console.log(mycart_data.length)
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.delete('/remove/mycart', //auth.verifyUser, auth.verifyAdmin,
    function (req, res) {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "secretKey");
        const deletedBy = decode.userId

        mycart.deleteMany({ userid: deletedBy })
            .then(function (result) {
                res.status(200).json({ message: "item removed" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })
    });

router.delete("/delete/mycart/:id", function (req, res) {

    const id = req.params.id;

    mycart.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "item Removed", success: true })
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
});

router.put('/quantity/update/:id',
    function (req, res) {
        const { id } = req.params;
        const { quantity } = req.body;

        GadgetCart.updateOne({ _id: id }, { quantity: quantity })
            .then(function (result) {
                res.status(200).json({ // 200 OK 
                    success: true,
                    message: "quantity updated."
                })
            })
            .catch(function (err) {
                res.status(500).json({ // 500 Internal Server Error
                    success: false,
                    message: "Unable to update quantity.",
                    error: err
                });
            })
    })


router.post('/mycheckout/insert',
    function (req, res) {
        const { userid, itemcount, totalamount, totalamounttax, paymentmethod, status, myproduct, token } = req.body
        const { billingfirstname, billinglastname, billingphone, billingemail, billingaddress,
            billingzip, billingdistrict, billingprovince } = req.body

        // console.log(req.body)
        const checkout = new mycheckout({
            userid, paymentmethod, status, token,
            productinfo: {
                itemcount, totalamount, totalamounttax, myproduct,
            },
            billingaddress: {
                billingfirstname, billinglastname, billingphone, billingemail, billingaddress,
                billingzip, billingdistrict, billingprovince
            }
        });
        checkout.save()
            .then(function (result) {
                res.status(201).json({ message: "successfull" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/mycheckout/myorder', function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, "secretKey");
    const userid = decode.userId;
    mycheckout.find({ userid })
        .then(function (result) {
            res.status(200).json({
                success: true,
                data: result,
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


// total revenue of company (only delivered amount)

// router.get('/admin/total/revenue',
//     function (req, res) {
//         mycheckout.aggregate([
//             {
//                 $match: {
//                     "productinfo.myproduct.status": "Delivered"
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     total_revenue: { $sum: "$productinfo.totalamounttax" },
//                     totalItemSold: { $sum: "$productinfo.myproduct.productquantity" }
//                 }
//             }
//         ])
//             .then(function (result) {
//                 res.status(200).json({
//                     success: true,
//                     data: result,
//                 });
//             })
//             .catch(function (e) {
//                 res.status(500).json({ message: e })
//             })
//     })

// ====================OR====================
router.get('/admin/total/revenue',
    function (req, res) {
        mycheckout.aggregate([
            { $match: {} },
            { $unwind: "$productinfo" },
            { $project: { _id: null, totalAmount: "$productinfo.totalamounttax", myProducts: "$productinfo.myproduct" } },

            { $unwind: "$myProducts" },
            { $project: { _id: null, totalAmount: "$totalAmount", myProducts: "$myProducts" } },
            { $match: { "myProducts.status": "Delivered" } },

            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    totalItemSold: { $sum: "$myProducts.productquantity" }
                }
            }
        ])
            .then(function (result) {
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })

// total order left
router.get('/admin/order/left',
    function (req, res) {
        mycheckout.aggregate([
            {

                $match: {
                    $or: [
                        { "productinfo.myproduct.status": "Pending" },
                        { "productinfo.myproduct.status": "Shipped" }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    totalOrder: { $sum: "$productinfo.itemcount" }
                }
            }
        ])
            .then(function (result) {
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })

// order left details
router.get('/admin/order/left/details',
    function (req, res) {
        mycheckout.aggregate([
            { $unwind: "$productinfo" },
            {
                $project: {
                    _id: 1,
                    userid: "$userid",
                    totalAmountTax: "$productinfo.totalamounttax",
                    totalAmount: "$productinfo.totalamount",
                    totalProduct: { $size: "$productinfo.myproduct" },
                    status: "$productinfo.myproduct.status",
                    paymentMethod: "$productinfo.myproduct.paymentmethod",
                    checkoutDate: { "$dateToString": { "format": "%Y-%m-%d", "date": "$checkoutDate" } }
                }
            },
            {
                $project: {
                    _id: 1,
                    userid: "$userid",
                    totalAmount: "$totalAmount",
                    totalAmountTax: "$totalAmountTax",
                    totalProduct: "$totalProduct",
                    status: { $arrayElemAt: ["$status", 0] },
                    paymentMethod: { $arrayElemAt: ["$paymentMethod", 0] },
                    checkoutDate: "$checkoutDate"
                }
            },
            // {

            //     $match: {
            //         $or: [
            //             { "status": "Pending" },
            //             { "status": "Shipped" }
            //         ]
            //     }
            // },
        ]).sort({ checkoutDate: -1 })
            .then(function (result) {
                // console.log(result[0].status[0])
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })


router.get('/admin/order/one/:id',
    function (req, res) {
        const { id } = req.params;
        mycheckout.aggregate([
            { $match: { "_id": ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userid",    // field in the ProductRequest collection
                    foreignField: "_id",  // field in the users collection
                    as: "userInfo"
                }
            },
            { $unwind: "$productinfo" },
            {
                $project: {
                    _id: 1,
                    userid: "$userid",
                    totalAmountTax: "$productinfo.totalamounttax",
                    totalAmount: "$productinfo.totalamount",
                    itemcount: "$productinfo.itemcount",
                    checkoutDate: { "$dateToString": { "format": "%Y-%m-%d", "date": "$checkoutDate" } },
                    myproduct: "$productinfo.myproduct",
                    billingaddress: 1,
                    userInfo: { $arrayElemAt: ["$userInfo", 0] },
                }
            },
            {
                $project: {
                    _id: 1,
                    userid: "$userid",
                    firstname: "$userInfo.firstname",
                    lastname: "$userInfo.lastname",
                    email: "$userInfo.email",
                    phone: "$userInfo.phone",
                    totalamounttax: "$totalAmountTax",
                    totalamount: "$totalAmount",
                    itemcount: "$itemcount",
                    checkoutDate: "$checkoutDate",
                    myproduct: "$myproduct",
                    billingaddress: "$billingaddress"
                }
            },
        ])
            .then(function (result) {
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })

// update nested order status
router.put('/admin/order/edit/:id',
    function (req, res) {
        const { id } = req.params;
        const { status } = req.body;

        mycheckout.updateOne({ "productinfo.myproduct._id": id },
            { $set: { "productinfo.myproduct.$.status": status } },
        )
            .then((data) => {
                return res.status(201).json({
                    message: "Product Details Changed.",
                    success: true,
                    data: data
                });
            })
            .catch(function (err) {
                return res.status(400).json({
                    message: err,
                    success: false
                })
            })

    })
module.exports = router;