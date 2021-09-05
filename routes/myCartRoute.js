const express = require('express');
const router = express.Router();
const mycart = require('../models/mycart');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const GadgetCart = require('../models/mycart');
const mycheckout = require('../models/mycheckout');

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
    const addedBy = decode.userId
    mycheckout.find()
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


module.exports = router;