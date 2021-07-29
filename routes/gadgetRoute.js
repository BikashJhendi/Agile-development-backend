const express = require('express');
const router = express.Router();
const gadget = require('../models/gadget');
const gadgetUploads = require('../middleware/gadget');
const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');


router.post('/gadget/insert',
    gadgetUploads.single('gadgetimage'), function (req, res) {
        const errors = validationResult(req);
        console.log(errors.array())

        const gadgetname = req.body.gadgetname;
        const gadgetprice = req.body.gadgetprice;
        const gadgettype = req.body.gadgettype;
        const gadgetdescription = req.body.gadgetdescription;
        
        const laptopBrand = req.body.laptopBrand;
        const laptopModel = req.body.laptopModel;
        const laptopDimension = req.body.laptopDimension;
        const laptopWeight = req.body.laptopWeight;
        const laptopSize = req.body.laptopSize;
        const laptopResolution = req.body.laptopResolution;
        const laptopProcessor = req.body.laptopProcessor;
        const laptopBaseClock = req.body.laptopBaseClock;
        const laptopSpeed = req.body.laptopSpeed;
        const laptopRam = req.body.laptopRam;
        const laptopGraphic = req.body.laptopGraphic;
        const laptopDedicatedGraphicMemory = req.body.laptopDedicatedGraphicMemory;
        const laptopDedicatedGraphic = req.body.laptopDedicatedGraphic;
        const laptopHarddisk = req.body.laptopHarddisk;
        const laptopSSD = req.body.laptopSSD;
        const laptopNoOfUSBPorts = req.body.laptopNoOfUSBPorts;
        const laptopUSBPorts = req.body.laptopUSBPorts;
        const laptopHDMIPorts = req.body.laptopHDMIPorts;
        const laptopMultiCardSlot = req.body.laptopMultiCardSlot;
        const laptopHeadphone = req.body.laptopHeadphone;
        const laptopJack = req.body.laptopJack;
        


        const gadget_data = new gadget({ 
            gadgetname: gadgetname, gadgetprice: gadgetprice, gadgettype: gadgettype, gadgetdescription: gadgetdescription, gadgetimage: req.file.filename, 
            laptopBrand: laptopBrand, laptopModel: laptopModel, laptopDimension: laptopDimension, laptopWeight: laptopWeight,
            laptopSize: laptopSize, laptopResolution: laptopResolution, laptopProcessor: laptopProcessor, laptopBaseClock: laptopBaseClock,
            laptopSpeed: laptopSpeed, laptopRam: laptopRam, laptopGraphic: laptopGraphic, laptopDedicatedGraphicMemory: laptopDedicatedGraphicMemory,
            laptopDedicatedGraphic: laptopDedicatedGraphic, laptopHarddisk: laptopHarddisk, laptopSSD: laptopSSD, laptopNoOfUSBPorts: laptopNoOfUSBPorts,
            laptopUSBPorts: laptopUSBPorts, laptopHDMIPorts: laptopHDMIPorts, laptopMultiCardSlot: laptopMultiCardSlot, laptopHeadphone: laptopHeadphone,
            laptopJack: laptopJack});
        gadget_data.save()
            .then(function (result) {
                res.status(201).json({ message: "Gadget Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/gadget/showall', function (req, res) {

    gadget.find()
        .then(function (gadget_data) {
            res.status(200).json({
                success: true,
                data: gadget_data
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/gadget/five', function (req, res) {

    gadget.find().limit(5)
        .then(function (gadget_five) {
            res.status(200).json({
                success: true,
                data: gadget_five
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

router.get('/gadget/one/:id', function (req, res) {
    const id = req.params.id;
    gadget.find({ _id: id })
        .then(function (data) {
            res.status(200).json({ data: data });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


module.exports = router;