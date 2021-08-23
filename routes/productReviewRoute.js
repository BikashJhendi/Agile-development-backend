const express = require('express');
const reviewupload = require('../middleware/review');
const router = express.Router();
const productReview = require('../models/productReview');

router.post('/product/review', reviewupload.single('reviewImage'), function (req, res) {

    const productId = req.body.productId;
    const review = req.body.review;
    const rating = req.body.rating;
    

    const review_data = new productReview({ productId: productId, review: review,  rating: rating,  reviewImage:req.file.filename });

    review_data.save()
        .then(function (result) {
            res.status(201).json({ message: "Review Added" })
        })
        .catch(function (err) {
            res.status(500).json({
                success: false,
                message: err })
        });
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
                message: e })
        });
})

module.exports = router;