const express = require('express');
const router = express.Router();
const question = require('../models/questions');

router.post('/question/ask', function (req, res) {

    const productId = req.body.productId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const askQuestion = req.body.askQuestion;
    const answer = req.body.answer;


    const question_data = new question({ productId: productId, askQuestion: askQuestion, answer: answer, firstName:firstName, lastName:lastName });

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