const express = require('express');
const mongoose = require('mongoose');
const reviewupload = require('../middleware/ImageController/review');
const router = express.Router();
const jwt = require('jsonwebtoken');
const productReview = require('../models/productReview');
const mycheckout = require('../models/mycheckout');
const { check, validationResult } = require('express-validator');
const uploadReviewImg = require('../middleware/ImageController/review');
const multer = require('multer');
const ObjectId = mongoose.Types.ObjectId;


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
        const { userId } = decode;

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


            const review_data = new productReview({ productId, userId, review, rating, reviewImages: arrayOfImg });

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


// router.get('/productone/review/:productId', function (req, res) {
//     const productId = req.params.productId;

//     productReview.find({ productId: productId }).sort({ questionDate: -1 })
//         .then(function (question_data) {
//             res.status(201).json({
//                 success: true,
//                 data: question_data
//             })
//         })
//         .catch(function (e) {

//             res.status(500).json({
//                 success: false,
//                 message: e
//             })
//         });
// })

router.get('/productone/review/:productId',
    function (req, res) {
        const productId = req.params.productId;

        productReview.aggregate([
            { $match: { "productId": ObjectId(productId) } },
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
                    _id: 1, review: 1, reviewImages: 1, rating: 1, firstname: "$userInfo.firstname",
                    lastname: "$userInfo.lastname", img: "$userInfo.img"
                }
            },

        ])
            .then(function (result) {
                // success insert
                res.status(201).json({
                    message: "Review Pulled Successfully.",
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

router.get('/productone/addreview/:productId',
    function (req, res) {
        const productId = req.params.productId;

        mycheckout.aggregate([
            { $unwind: "$productinfo.myproduct" },
            {
                $project: {
                    productInfo: "$productinfo.myproduct"
                }
            },
            { $match: { "productInfo.productid": ObjectId(productId) } },
            {
                $lookup: {
                    from: "gadgets",
                    localField: "productInfo.productid",    // field in the ProductRequest collection
                    foreignField: "_id",  // field in the users collection
                    as: "productInfo1"
                },
            },
            {
                $lookup: {
                    from: "cosmetics",
                    localField: "productInfo.productid",    // field in the ProductRequest collection
                    foreignField: "_id",  // field in the users collection
                    as: "productInfo2"
                }
            },


        ])
            .then(function (result) {
                // success insert
                res.status(201).json({
                    message: "Review Pulled Successfully.",
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