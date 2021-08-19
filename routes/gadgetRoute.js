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
        const gadgetfeatured = req.body.gadgetfeatured;
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

        const cameraType = req.body.cameraType;
        const cameraResolution = req.body.cameraResolution;
        const cameraSalesPackage = req.body.cameraSalesPackage;
        const cameraDimensions = req.body.cameraDimensions;
        const cameraWeight = req.body.cameraWeight;
        const cameraLensType = req.body.cameraLensType;
        const cameraLensFocalLength = req.body.cameraLensFocalLength;
        const cameraSensorType = req.body.cameraSensorType;
        const cameraSensorFormat = req.body.cameraSensorFormat;
        const cameraSensorSize = req.body.cameraSensorSize;
        const cameraScreenSize = req.body.cameraScreenSize;
        const cameraDisplayType = req.body.cameraDisplayType;
        const cameraDisplayResolution = req.body.cameraDisplayResolution;
        const cameraMemoryCardType = req.body.cameraMemoryCardType;
        const cameraConnectivity = req.body.cameraConnectivity;
        const cameraVideoFormats = req.body.cameraVideoFormats;
        const cameraHDRSupport = req.body.cameraHDRSupport;
        const cameraImageFormats = req.body.cameraImageFormats;
        const cameraSupportedAudioFormats = req.body.cameraSupportedAudioFormats;
        const cameraVideoResolution = req.body.cameraVideoResolution;
        const cameraVideoResolutionDetails = req.body.cameraVideoResolutionDetails;
        const cameraBatteryType = req.body.cameraBatteryType;
        const cameraBatteryCapacity = req.body.cameraBatteryCapacity;
        const cameraNoOfShots = req.body.cameraNoOfShots;
        const cameraMicrophone = req.body.cameraMicrophone;
        const cameraTripodSocket = req.body.cameraTripodSocket;
        const cameraHeadphoneJack = req.body.cameraHeadphoneJack;
        const cameraUSBConnectivity = req.body.cameraUSBConnectivity;
        const cameraPictBridgeSupport = req.body.cameraPictBridgeSupport;


        const gadget_data = new gadget({
            gadgetname: gadgetname, gadgetprice: gadgetprice, gadgettype: gadgettype, gadgetfeatured:gadgetfeatured, gadgetdescription: gadgetdescription, gadgetimage: req.file.filename,
            laptopBrand: laptopBrand, laptopModel: laptopModel, laptopDimension: laptopDimension, laptopWeight: laptopWeight,
            laptopSize: laptopSize, laptopResolution: laptopResolution, laptopProcessor: laptopProcessor, laptopBaseClock: laptopBaseClock,
            laptopSpeed: laptopSpeed, laptopRam: laptopRam, laptopGraphic: laptopGraphic, laptopDedicatedGraphicMemory: laptopDedicatedGraphicMemory,
            laptopDedicatedGraphic: laptopDedicatedGraphic, laptopHarddisk: laptopHarddisk, laptopSSD: laptopSSD, laptopNoOfUSBPorts: laptopNoOfUSBPorts,
            laptopUSBPorts: laptopUSBPorts, laptopHDMIPorts: laptopHDMIPorts, laptopMultiCardSlot: laptopMultiCardSlot, laptopHeadphone: laptopHeadphone,
            laptopJack: laptopJack,
            cameraType: cameraType, cameraResolution: cameraResolution, cameraSalesPackage: cameraSalesPackage, cameraDimensions: cameraDimensions,
            cameraWeight: cameraWeight, cameraLensType: cameraLensType, cameraLensFocalLength: cameraLensFocalLength, cameraSensorType: cameraSensorType,
            cameraSensorFormat: cameraSensorFormat, cameraSensorSize: cameraSensorSize, cameraScreenSize: cameraScreenSize, cameraDisplayType: cameraDisplayType,
            cameraDisplayResolution: cameraDisplayResolution, cameraMemoryCardType: cameraMemoryCardType, cameraConnectivity: cameraConnectivity, cameraVideoFormats: cameraVideoFormats,
            cameraHDRSupport: cameraHDRSupport, cameraImageFormats: cameraImageFormats, cameraSupportedAudioFormats: cameraSupportedAudioFormats,
            cameraVideoResolution: cameraVideoResolution, cameraVideoResolutionDetails: cameraVideoResolutionDetails, cameraBatteryType: cameraBatteryType,
            cameraBatteryCapacity: cameraBatteryCapacity, cameraNoOfShots: cameraNoOfShots, cameraMicrophone: cameraMicrophone, cameraTripodSocket: cameraTripodSocket,
            cameraHeadphoneJack: cameraHeadphoneJack, cameraUSBConnectivity: cameraUSBConnectivity, cameraPictBridgeSupport: cameraPictBridgeSupport

        });
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
    const gt = "Laptop";

    gadget.find({ gadgettype: gt }).limit(5)
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
router.get('/camera/five', function (req, res) {
    const gt = "Camera";

    gadget.find({ gadgettype: gt }).limit(5)
        .then(function (gadget_camera) {
            res.status(200).json({
                success: true,
                data: gadget_camera
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
// gadget filter
router.get('/laptop/acer', function (req, res) {
    const gm = "Acer";

    gadget.find({ gadgetname: gm })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/dell', function (req, res) {
    const gd = "Dell";

    gadget.find({ gadgetname: gd })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/hp', function (req, res) {
    const gh = "HP";

    gadget.find({ gadgetname: gh })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/lenovo', function (req, res) {
    const gl = "Lenovo";

    gadget.find({ gadgetname: gl })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/razer', function (req, res) {
    const gr = "Razer";

    gadget.find({ gadgetname: gr })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/msi', function (req, res) {
    const gm = "MSI";

    gadget.find({ gadgetname: gm })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/arous', function (req, res) {
    const ga = "Arous";

    gadget.find({ gadgetname: ga })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/apple', function (req, res) {
    const ga = "Apple";

    gadget.find({ gadgetname: ga })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/microsoft', function (req, res) {
    const gm = "Microsoft";

    gadget.find({ gadgetname: ga })
        .then(function (gadget_name) {
            res.status(200).json({
                success: true,
                data: gadget_name
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

router.post('/gadget/add', function (req, res) {
var gadget = [{gadgetname:gadgetname, gadgetprice:gadgetprice, gadgettype:gadgettype, gadgetdescription:gadgetdescription,
     laptop:{laptopBrand:laptopBrand, laptopModel:laptopModel}, camera:{cameraType:cameraType, cameraResolution:sdifficulty}}]
    User.updateOne({_id:id},{
        $set : {gadget:gadget}
    }).then(function(data){
        res.status(200).json({message : "Language Information Updated",success:true})
    }).catch(function(err){
        res.status(500).json({message : err,success:false})
    })
})

module.exports = router;