const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ProductRequest = require('../models/productRequest');

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

module.exports = router;