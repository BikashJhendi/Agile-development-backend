const express = require('express');
const reviewupload = require('../middleware/ImageController/review');
const router = express.Router();
const jwt = require('jsonwebtoken');
const productReview = require('../models/productReview');
const { check, validationResult } = require('express-validator');
const uploadReviewImg = require('../middleware/ImageController/review');
const multer = require('multer');

const maxImage = 5;
var upload = uploadReviewImg.array('reviewImages', maxImage)


router.post('/product/review', function (req, res) {
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
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "secretKey");
        const { firstName, lastName } = decode;

        const { productId, review, rating } = req.body;

        if (!req.files) {
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


            const review_data = new productReview({ productId, firstName, lastName, review, rating, reviewImages: arrayOfImg });

            review_data.save()
                .then(function (result) {
                    res.status(201).json({ message: "Review Added" })
                })
                .catch(function (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                });
        }
    })
})


router.get('/productone/review/:productId', function (req, res) {
    const productId = req.params.productId;

    productReview.find({ productId: productId }).sort({ questionDate: -1 })
        .then(function (question_data) {
            res.status(201).json({
                success: true,
                data: question_data
            })
        })
        .catch(function (e) {

            res.status(500).json({
                success: false,
                message: e
            })
        });
})

module.exports = router;