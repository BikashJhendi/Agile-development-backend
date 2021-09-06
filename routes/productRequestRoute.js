const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ProductRequest = require('../models/productRequest');
const mongoose = require('mongoose');

router.post('/user/product-request',
    function (req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "secretKey");
        const { userId } = decode;

        const { productName, productType, productLink, productDesription } = req.body;

        const PR = new ProductRequest({ productName, productType, productLink, productDesription, userId });
        PR.save()
            .then(function (result) {
                // success insert
                res.status(201).json({
                    message: "Product Requested Successfully.",
                    success: true,
                    data: result
                });
            })
            .catch(function (err) {
                res.status(400).json({
                    message: err,
                    success: false
                })
            })
    })

router.get('/admin/product/request/all',
    function (req, res) {
        ProductRequest.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",    // field in the ProductRequest collection
                    foreignField: "_id",  // field in the users collection
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },
            {
                $project: {
                    _id: 1, status: 1, productName: 1, productType: 1, productLink: 1,
                    productDesription: 1, requestedDate: { "$dateToString": { "format": "%Y-%m-%d", "date": "$requestedDate" } }, userId: 1, firstname: "$userInfo.firstname",
                    lastname: "$userInfo.lastname", img: "$userInfo.img", email: "$userInfo.email"
                }
            },

        ]).sort({ requestedDate: -1 })
            .then(function (result) {
                // success insert
                res.status(201).json({
                    message: "Retrieve Successfully.",
                    success: true,
                    data: result
                });
            })
            .catch(function (err) {
                res.status(400).json({
                    message: err,
                    success: false
                })
            })
    })


router.get('/admin/product/request/:id',
    function (req, res) {
        const { id } = req.params;
        ProductRequest.aggregate([
            { $match: { "_id": mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",    // field in the ProductRequest collection
                    foreignField: "_id",  // field in the users collection
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },
            {
                $project: {
                    _id: 1, status: 1, productName: 1, productType: 1, productLink: 1,
                    productDesription: 1, requestedDate: { "$dateToString": { "format": "%Y-%m-%d", "date": "$requestedDate" } }, userId: 1, firstname: "$userInfo.firstname",
                    lastname: "$userInfo.lastname", img: "$userInfo.img", email: "$userInfo.email", phone: "$userInfo.phone"
                }
            },

        ])
            .then(function (result) {
                // success insert
                res.status(201).json({
                    message: "Retrieve Successfully.",
                    success: true,
                    data: result
                });
            })
            .catch(function (err) {
                res.status(400).json({
                    message: err,
                    success: false
                })
            })
    })

router.put('/admin/product/request/edit/:id',
    function (req, res) {
        const { id } = req.params;
        const { productName, status, productType, productLink, productDesription } = req.body;

        ProductRequest.updateOne({ _id: id }, {
            productName, status, productType, productLink, productDesription
        })
            .then((data) => {
                return res.status(201).json({
                    message: "Product Details Changed.",
                    success: true
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