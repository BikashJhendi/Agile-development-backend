const express = require('express');
const router = express.Router();
const cosmetic = require('../models/cosmetic');
const cosmeticUploads = require('../middleware/cosmetic');
const { check, validationResult } = require('express-validator');
const uploadCosmeticImg = require('../middleware/cosmetic.js');
const multer = require('multer');
// const fileupload = require('../middleware/fileupload.js');

const maxImage = 5;
var upload = uploadCosmeticImg.array('cosmeticImages', maxImage)

router.post('/cosmetic/insert',
    function (req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({
                    message: "A Multer error occurred when uploading",
                    success: false,
                    err: err
                })
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(400).json({
                    message: "An unknown error occurred when uploading",
                    success: false,
                    err: err
                })
                
            }
            const errors = validationResult(req);
            console.log(errors.array())


        const cosmeticname = req.body.cosmeticname;
        const cosmeticprice = req.body.cosmeticprice;
        const cosmetictype = req.body.cosmetictype;
        const cosmeticgender = req.body.cosmeticgender;
        const cosmeticmodel = req.body.cosmeticmodel;
        const cosmeticdescription = req.body.cosmeticdescription;
        const featured = req.body.featured;


            if (!req.files || req.files.length == 0) {
                return res.status(400).json({
                    message: "Require at least one image.",
                    success: false
                })
            }
            else {

                // creating array to store image filename
                const arrayOfImg = new Array();

                // requesting the length of files and adding it into the array of list.
                for (i = 0; i < req.files.length; i++) {
                    // adding image filename to the array. [hero, car, bike, ...]
                    arrayOfImg.push({ imageName: req.files[i].filename })
                }
                const cosmetic_data = new cosmetic({
                    cosmeticname: cosmeticname, cosmeticprice: cosmeticprice,featured: featured, cosmetictype: cosmetictype,cosmeticgender: cosmeticgender,cosmeticmodel: cosmeticmodel,
                    cosmeticdescription: cosmeticdescription, cosmeticImages: arrayOfImg,

                });
                cosmetic_data.save()
                    .then(function (result) {
                        res.status(201).json({ message: "cosmetic Added" })
                    })
                    .catch(function (err) {
                        res.status(500).json({ message: err })
                    });
            }

        })

    })

router.get('/cosmetic/showall', function (req, res) {

    cosmetic.find()
        .then(function (cosmetic_data) {
            res.status(200).json({
                success: true,
                data: cosmetic_data
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/five', function (req, res) {

    cosmetic.find().limit(10)
        .then(function (cosmetic_five) {
            res.status(200).json({
                success: true,
                data: cosmetic_five
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/men', function (req, res) {
    const cm = "Men";

    cosmetic.find({ cosmeticgender: cm })
        .then(function (cosmetic_gender) {
            res.status(200).json({
                success: true,
                data: cosmetic_gender
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/women', function (req, res) {
    const cm = "Women";

    cosmetic.find({ cosmeticgender: cm })
        .then(function (cosmetic_gender) {
            res.status(200).json({
                success: true,
                data: cosmetic_gender
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/cosmetic/one/:id', function (req, res) {
    const id = req.params.id;
    cosmetic.find({ _id: id })
        .then(function (data) {
            res.status(200).json({ data: data });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


module.exports = router;