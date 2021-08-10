const express = require('express');
const router = express.Router();
const mycart = require('../models/mycart');
const { check, validationResult } = require('express-validator')

router.post('/gadgetcart/insert',
    function (req, res) {
     
        const{userid, productid, quantity, productname, productprice}=req.body

        const cart_id = new mycart({ userid, productid, quantity, productname, productprice });
        cart_id.save()
            .then(function (result) {
                res.status(201).json({ message: "cart Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

    router.post('/cosmeticcart/insert',
    function (req, res) {
    
        const{userid, productid, quantity, productname, productprice}=req.body;

        const cart_id = new mycart({ userid, productid, quantity, productname, productprice });
        cart_id.save()
            .then(function (result) {
                res.status(201).json({ message: "cart Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/mycart/one/:id', function (req, res) {
    const mycart = req.params.id
    mycart.find({ productid: mycart })
        .then(function (data) {
            res.status(200).json({ data: data });
            
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/mycart/showall', function (req, res) {

    mycart.find()
        .then(function (mycart_data) {
            res.status(200).json({
                success: true,
                data: mycart_data,
                count:mycart_data.length
            });
            console.log(mycart_data.length)
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.delete('/remove/mycart', //auth.verifyUser, auth.verifyAdmin,
    function (req, res) {
        mycart.deleteMany()
            .then(function (result) {
                res.status(200).json({ message: "item removed" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err})
            })
    });

    router.delete("/delete/mycart/:id",function(req,res){
        const id = req.params.id;
    
        mycart.deleteOne({_id:id})
        .then(function(result){
            res.status(200).json({message : "item Removed",success:true})
        })
        .catch(function(err){
            res.status(400).json({message : err})
        })
    
    });


module.exports = router;