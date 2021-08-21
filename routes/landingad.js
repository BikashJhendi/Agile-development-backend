const express = require('express');
const router = express.Router();
const landad = require('../models/landingAD');
const landingUploads = require('../middleware/landingAD');
const { check, validationResult } = require('express-validator');
const { request } = require('express');

router.post('/landing/insert',
    landingUploads.single('landingimage'), function (req, res) {
        const errors = validationResult(req);
        console.log(errors.array())

        const landing_data = new landad({
            landingimage: req.file.filename
        });
        landing_data.save()
            .then(function (result) {
                res.status(201).json({ message: "AD Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    });

    router.get('/landing/show', function (req, res) {

        landad.find().limit(5)
            .then(function (landing_data) {
                res.status(200).json({
                    success: true,
                    data: landing_data
                });
            })
            .catch(function (e) {
                res.status(500).json({ message: e })
            })
    })

module.exports = router;

