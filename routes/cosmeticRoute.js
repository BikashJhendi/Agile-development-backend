const express = require('express');
const router = express.Router();
const cosmetic = require('../models/cosmetic');
const cosmeticUploads = require('../middleware/cosmetic');
const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');
// const fileupload = require('../middleware/fileupload.js');

router.post('/cosmetic/insert',
    cosmeticUploads.single('cosmeticimage'), function (req, res) {
        const errors = validationResult(req);
        console.log(errors.array())

        const cosmeticname = req.body.cosmeticname;
        const cosmeticprice = req.body.cosmeticprice;
        const cosmetictype = req.body.cosmetictype;
        const cosmeticdescription = req.body.cosmeticdescription;


        const cosmetic_data = new cosmetic({ cosmeticname: cosmeticname, cosmeticprice: cosmeticprice, cosmetictype: cosmetictype, cosmeticdescription: cosmeticdescription, cosmeticimage: req.file.filename });
        cosmetic_data.save()
            .then(function (result) {
                res.status(201).json({ message: "cosmetic Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
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
router.get('/cosmetic/six', function (req, res) {

    cosmetic.find().limit(6)
        .then(function (cosmetic_six) {
            res.status(200).json({
                success: true,
                data: cosmetic_six
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