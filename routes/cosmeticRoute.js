const express = require('express');
const router = express.Router();
const cosmetic = require('../models/cosmetic');
const cosmeticUploads = require('../middleware/ImageController/cosmetic');
const { check, validationResult } = require('express-validator');
const uploadCosmeticImg = require('../middleware/ImageController/cosmetic');
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
        const brandName = req.body.brandName;


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
                    cosmeticdescription: cosmeticdescription,brandName: brandName, cosmeticImages: arrayOfImg,

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

// cosmetic filter
router.get('/cosmetic/price/high', function (req, res) {

    cosmetic.find().sort({cosmeticprice: -1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/price/low', function (req, res) {

    cosmetic.find().sort({cosmeticprice: 1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/men/low', function (req, res) {

    cosmetic.find({cosmeticgender: "Men"}).sort({cosmeticprice: 1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/men/high', function (req, res) {

    cosmetic.find({cosmeticgender: "Men"}).sort({cosmeticprice: -1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/women/high', function (req, res) {

    cosmetic.find({cosmeticgender: "Women"}).sort({cosmeticprice: -1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/women/low', function (req, res) {

    cosmetic.find({cosmeticgender: "Women"}).sort({cosmeticprice: 1})
        .then(function (cosmetic_price) {
            res.status(200).json({
                success: true,
                data: cosmetic_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/creed', function (req, res) {
    const creed = "Creed";

    cosmetic.find({ brandName: creed })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/hugo', function (req, res) {
    const hugo = "Hugo Boss";

    cosmetic.find({ brandName: hugo})
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/victoria', function (req, res) {
    const victoria = "Victoria Secret";

    cosmetic.find({ brandName: victoria})
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/dior', function (req, res) {
    const dior = "Dior";

    cosmetic.find({ brandName: dior})
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
//cosmetic type filter
router.get('/cosmetic/perfume', function (req, res) {
    const perfume = "Perfume";

    cosmetic.find({ cosmetictype: perfume})
        .then(function (cosmetic_type) {
            res.status(200).json({
                success: true,
                data: cosmetic_type
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/nailpolish', function (req, res) {
    const nailpolish = "Nailpolish";

    cosmetic.find({ cosmetictype: nailpolish})
        .then(function (cosmetic_type) {
            res.status(200).json({
                success: true,
                data: cosmetic_type
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/cosmetic/lotion', function (req, res) {
    const lotion = "Lotion";

    cosmetic.find({ cosmetictype: lotion})
        .then(function (cosmetic_type) {
            res.status(200).json({
                success: true,
                data: cosmetic_type
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