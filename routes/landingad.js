const express = require('express');
const router = express.Router();
const landad = require('../models/landingAD');
const landingUploads = require('../middleware/ImageController/landingAD');
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

router.get('/landing/show/all', function (req, res) {

    landad.find()
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

// to delete user account
router.delete('/admin/ad/delete/:id',
    function (req, res) {
        const { id } = req.params;

        landad.deleteOne({ _id: id })
            .then(function (data) {
                return res.status(200).json({
                    message: "User account deleted.",
                    success: true,
                    data: data
                })
            })
            .catch(function (err) {
                return res.status(400).json({
                    message: "Failed to delete user account.",
                    success: false,
                    err: err
                })
            })
    })


module.exports = router;

