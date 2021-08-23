const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const question = require('../models/questions');

router.post('/question/ask', function (req, res) {

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "secretKey");
    const { firstName, lastName } = decode;

    const { productId,  askQuestion, answer } = req.body;

    const question_data = new question({ productId, firstName, lastName, askQuestion, answer });

    question_data.save()
        .then(function (result) {
            res.status(201).json({ message: "Question Added" })
        })
        .catch(function (err) {
            res.status(500).json({
                success: false,
                message: err })
        });
})


router.get('/productone/question/:productId', function (req, res) {
    const productId = req.params.productId;

    question.find({ productId: productId }).sort({ questionDate: -1 })
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