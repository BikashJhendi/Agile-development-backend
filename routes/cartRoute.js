const express = require('express');
const router = express.Router();
const gadgetcart = require('../models/gadgetcart');
const { check, validationResult } = require('express-validator');


router.post('/gadgetcart/insert',
    function (req, res) {
     
        const userid = req.body.userid;
        const productid = req.body.productid;
        const quantity = req.body.quantity;

        const cart_id = new gadgetcart({ userid: userid, productid: productid, quantity: quantity });
        cart_id.save()
            .then(function (result) {
                res.status(201).json({ message: "cart Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/gadgetcart/one/:id', function (req, res) {
    const id = req.params.id;
    gadgetcart.find({ userid: id })
        .then(function (data) {
            res.status(200).json({ data: data });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

module.exports = router;