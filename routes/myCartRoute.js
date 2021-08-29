const express = require('express');
const router = express.Router();
const mycart = require('../models/mycart');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const GadgetCart = require('../models/mycart');
const mycheckout = require('../models/mycheckout');

// router.post('/gadgetcart/insert',
//     function (req, res) {

//         const { userid, productid, quantity, productname, productprice, producttype } = req.body

//         const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype });
//         cart_id.save()
//             .then(function (result) {
//                 res.status(201).json({ message: "cart Added" })
//             })
//             .catch(function (err) {
//                 res.status(500).json({ message: err })
//             });
//     })

// router.post('/cosmeticcart/insert',
//     function (req, res) {

//         const { userid, productid, quantity, productname, productprice, producttype } = req.body;

//         const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype });
//         cart_id.save()
//             .then(function (result) {
//                 res.status(201).json({ message: "cart Added" })
//             })
//             .catch(function (err) {
//                 res.status(500).json({ message: err })
//             });
//     })

router.post('/mycart/insert',
    function (req, res) {

        const { userid, productid, quantity, productname, productprice, producttype } = req.body;

        mycart.find({ userid })
            .then(function (data) {
                if (data.length == 0) {
                    const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype });

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
                    const cart_id = new mycart({ userid, productid, quantity, productname, productprice, producttype });

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

// router.put('/quantity/update/:id',
//     function (req, res) {
//         const { userid, quantity } = req.body;
//         const id = req.body;
//         console.log(quantity)
//         console.log(id)

//         GadgetCart.find({ userid })
//             .then(function (data) {
//                 if (data.length == 0) {
//                     return GadgetCart.updateOne({ quantity })
//                         .catch(function (err) {
//                             res.status(500).json({ // 500 Internal Server Error
//                                 success: false,
//                                 message: "Unable to update quantity.",
//                                 error: err
//                             });
//                         })
//                 }

//                 var updateCart = data.find(item => {
//                     if (item.productid == id) {
//                         return item.userid
//                     }
//                 })

//                 if (updateCart) {
//                     return GadgetCart.updateOne({ quantity })
//                         .then(function (result) {
//                             res.status(200).json({ // 200 OK 
//                                 success: true,
//                                 message: "quantity updated."
//                             })
//                         })
//                 }

//                 else {
//                     return GadgetCart.updateOne({ quantity })
//                         .then(function (result) {
//                             res.status(200).json({ // 200 OK 
//                                 success: true,
//                                 message: "quantity updated."
//                             })
//                         })
//                         .catch(function (err) {
//                             res.status(500).json({ // 500 Internal Server Error
//                                 success: false,
//                                 message: "Unable to update quantity.",
//                                 error: err
//                             });
//                         })
//                 }

//             })
//             .catch(function (err) {
//                 res.status(404).json({ // 500 internal server error
//                     success: false,
//                     message: "User Not Found",
//                     error: err
//                 });
//             })

//         

//     });

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

// router.post('/mytotalamount/insert',
//     function (req, res) {

//         const { userid, productid, itemcount, totalamount, totalamounttax } = req.body;

//         mytotalamount.find({ userid })
//             .then(function (data) {
//                 if (data.length == 0) {
//                     const amount = new mytotalamount({ userid, productid, itemcount, totalamount, totalamounttax });

//                     return amount.save()
//                         .then(function (result) {
//                             res.status(201).json({
//                                 message: "saved!",
//                                 success: true
//                             })
//                         })
//                         .catch(function (err) {
//                             res.status(500).json({
//                                 message: err,
//                                 success: false
//                             })
//                         });
//                 }
//                 else {
//                     const amount = new mytotalamount({ userid, productid, itemcount, totalamount, totalamounttax });

//                     return amount.save()
//                         .then(function (result) {
//                             res.status(201).json({
//                                 message: "saved!",
//                                 success: true
//                             })
//                         })
//                         .catch(function (err) {
//                             res.status(500).json({
//                                 message: err,
//                                 success: false
//                             })
//                         });
//                 }
//             })
//             .catch(function (err) {
//                 res.status(404).json({ // 500 internal server error
//                     success: false,
//                     message: "User Not Found",
//                     error: err
//                 });
//             })
//     })

router.post('/mycheckout/insert',
    function (req, res) {
        const { userid, itemcount, totalamount, totalamounttax, paymentmethod, status, productname } = req.body
        const { billingfirstname, billinglastname, billingphone, billingemail, billingaddress,
            billingzip, billingdistrict, billingprovince } = req.body

        console.log(req.body)
        const checkout = new mycheckout({
            userid, paymentmethod, status,
            productinfo: {
                itemcount, totalamount, totalamounttax, myproduct: [{ productname }]
            },
            billingaddress: {
                billingfirstname, billinglastname, billingphone, billingemail, billingaddress,
                billingzip, billingdistrict, billingprovince
            }
        });
        checkout.save()
            .then(function (result) {
                res.status(201).json({ message: "cart Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/mycheckout/showall', function (req, res) {
    // const token = req.headers.authorization.split(' ')[1];
    // const decode = jwt.verify(token, "secretKey");
    // const addedBy = decode.userId
    mycheckout.find()
        .then(function (total) {
            res.status(200).json({
                success: true,
                data: total,
            });
            // console.log(mycart_data.length)
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
module.exports = router;