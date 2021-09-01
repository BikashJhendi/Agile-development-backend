const express = require('express');
const router = express.Router();
const AD = require('../models/gadgetAD');
const adUploads = require('../middleware/ImageController/gadget');
const { check, validationResult } = require('express-validator');
const { request } = require('express');

router.post('/ad/insert',
    adUploads.single('adimage'), function (req, res) {
        const errors = validationResult(req);
        console.log(errors.array())

        const ad_data = new AD({
            adimage: req.file.filename
        });
        ad_data.save()
            .then(function (result) {
                res.status(201).json({ message: "AD Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    });

    router.get('/ad/show', function (req, res) {

        AD.find()
            .then(function (ad_data) {
                res.status(200).json({
                    success: true,
                    data: ad_data
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })

module.exports = router;

