const express = require('express');
const router = express.Router();
const Cosmetic = require('../models/cosmetic');
const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');
// const fileupload = require('../middleware/fileupload.js');

router.post('/cosmetic/insert', 
    function (req, res) {
        const cosmeticname = req.body.cosmeticname;
        const cosmeticprice = req.body.cosmeticprice;
        const cosmetictype = req.body.cosmetictype;
        const cosmeticdescription = req.body.cosmeticdescription;
        const cosmeticimage = req.body.cosmeticimage;

        const cosmetic_data = new Cosmetic({cosmeticname: cosmeticname, cosmeticprice: cosmeticprice, cosmetictype: cosmetictype,cosmeticdescription: cosmeticdescription, cosmeticimage: cosmeticimage });
        cosmetic_data.save()
            .then(function (result) {
                res.status(201).json({ message: "cosmetic Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/cosmetic/showall', function(req, res){
    
    Cosmetic.find()
    .then(function(cosmetic_data){
        res.status(200).json({success: true,
            data : cosmetic_data});
    })
    .catch(function(e){
    res.status(500).json({message : e})
})
})

router.get('/cosmetic/one/:id',function(req,res){
    const id=req.params.id;
    Cosmetic.find({_id:id})
    .then(function(data){
        res.status(200).json({data:data});
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})


module.exports = router;