const express = require('express');
const router = express.Router();
const gadgetcart = require('../models/gadgetcart');
const { check, validationResult } = require('express-validator')


router.post('/gadgetcart/insert',
    function (req, res) {
     
        const{userid, productid, quantity, gadgetname, gadgetprice}=req.body

        const cart_id = new gadgetcart({ userid, productid, quantity, gadgetname, gadgetprice });
        cart_id.save()
            .then(function (result) {
                res.status(201).json({ message: "cart Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/gadgetcart/one/:id', function (req, res) {
    const mycart = req.params.id
    gadgetcart.find({ productid: mycart })
        .then(function (data) {
            res.status(200).json({ data: data });
            
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/mycart/showall', function (req, res) {

    gadgetcart.find()
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

router.delete('/delete/mycart', //auth.verifyUser, auth.verifyAdmin,
    function (req, res) {
        gadgetcart.deleteMany()
            .then(function (result) {
                res.status(200).json({ message: "item removed" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err})
            })
    });

    router.delete("/delete/mycart/:id",function(req,res){
        const id = req.params.id;
    
        gadgetcart.deleteOne({_id:id})
        .then(function(result){
            res.status(200).json({message : "item Removed",success:true})
        })
        .catch(function(err){
            res.status(400).json({message : err})
        })
    
    });


module.exports = router;