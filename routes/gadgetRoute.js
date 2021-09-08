const express = require('express');
const router = express.Router();
const gadget = require('../models/gadget');
const gadgetUploads = require('../middleware/ImageController/gadget');
const { check, validationResult } = require('express-validator');
const uploadGadgetImg = require('../middleware/ImageController/gadget.js');
const multer = require('multer');
// const auth = require('../middleware/auth');

const maxImage = 5;
var upload = uploadGadgetImg.array('gadgetImages', maxImage)


router.post('/gadget/insert',
    function (req, res) {
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


            const gadgetname = req.body.gadgetname;
            const gadgetprice = req.body.gadgetprice;
            const gadgettype = req.body.gadgettype;
            const featured = req.body.featured;
            const gadgetdescription = req.body.gadgetdescription;
            const brandName = req.body.brandName;


            const laptopModel = req.body.laptopModel;
            const laptopDimension = req.body.laptopDimension;
            const laptopWeight = req.body.laptopWeight;
            const laptopSize = req.body.laptopSize;
            const laptopResolution = req.body.laptopResolution;
            const laptopProcessor = req.body.laptopProcessor;
            const laptopBaseClock = req.body.laptopBaseClock;
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

            if (!req.files || req.files.length == 0) {
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
                const gadget_data = new gadget({
                    gadgetname: gadgetname, gadgetprice: gadgetprice, gadgettype: gadgettype, featured: featured, gadgetdescription: gadgetdescription, brandName: brandName,
                    gadgetImages: arrayOfImg,

                    laptop: {
                        laptopModel: laptopModel, laptopDimension: laptopDimension, laptopWeight: laptopWeight,
                        laptopSize: laptopSize, laptopResolution: laptopResolution, laptopProcessor: laptopProcessor, laptopBaseClock: laptopBaseClock,
                        laptopRam: laptopRam, laptopGraphic: laptopGraphic, laptopDedicatedGraphicMemory: laptopDedicatedGraphicMemory,
                        laptopDedicatedGraphic: laptopDedicatedGraphic, laptopHarddisk: laptopHarddisk, laptopSSD: laptopSSD, laptopNoOfUSBPorts: laptopNoOfUSBPorts,
                        laptopUSBPorts: laptopUSBPorts, laptopHDMIPorts: laptopHDMIPorts, laptopMultiCardSlot: laptopMultiCardSlot, laptopHeadphone: laptopHeadphone,
                        laptopJack: laptopJack
                    },
                    camera: {
                        cameraType: cameraType, cameraResolution: cameraResolution, cameraSalesPackage: cameraSalesPackage, cameraDimensions: cameraDimensions,
                        cameraWeight: cameraWeight, cameraLensType: cameraLensType, cameraLensFocalLength: cameraLensFocalLength, cameraSensorType: cameraSensorType,
                        cameraSensorFormat: cameraSensorFormat, cameraSensorSize: cameraSensorSize, cameraScreenSize: cameraScreenSize, cameraDisplayType: cameraDisplayType,
                        cameraDisplayResolution: cameraDisplayResolution, cameraMemoryCardType: cameraMemoryCardType, cameraConnectivity: cameraConnectivity, cameraVideoFormats: cameraVideoFormats,
                        cameraHDRSupport: cameraHDRSupport, cameraImageFormats: cameraImageFormats, cameraSupportedAudioFormats: cameraSupportedAudioFormats,
                        cameraVideoResolution: cameraVideoResolution, cameraVideoResolutionDetails: cameraVideoResolutionDetails, cameraBatteryType: cameraBatteryType,
                        cameraBatteryCapacity: cameraBatteryCapacity, cameraNoOfShots: cameraNoOfShots, cameraMicrophone: cameraMicrophone, cameraTripodSocket: cameraTripodSocket,
                        cameraHeadphoneJack: cameraHeadphoneJack, cameraUSBConnectivity: cameraUSBConnectivity, cameraPictBridgeSupport: cameraPictBridgeSupport
                    }
                });
                gadget_data.save()
                    .then(function (result) {
                        res.status(201).json({ message: "Gadget Added" })
                    })
                    .catch(function (err) {
                        res.status(500).json({ message: err })
                    });
            }

        })
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

    gadget.find({ gadgettype: gt, featured: "NotFeatured" }).limit(10)
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
//gadget Filter
router.get('/gadget/laptop', function (req, res) {
    const gt = "Laptop";

    gadget.find({ gadgettype: gt })
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

    gadget.find({ gadgettype: gt }).limit(10)
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
router.get('/gadget/camera', function (req, res) {
    const gt = "Camera";

    gadget.find({ gadgettype: gt })
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
// laptop filter
router.get('/laptop/acer', function (req, res) {
    const acer = "Acer";

    gadget.find({ brandName: acer })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/asus', function (req, res) {
    const asus = "Asus";

    gadget.find({ brandName: asus })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/dell', function (req, res) {
    const dell = "Dell";

    gadget.find({ brandName: dell })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/hp', function (req, res) {
    const hp = "HP";

    gadget.find({ brandName: hp })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/lenovo', function (req, res) {
    const lenovo = "Lenovo";

    gadget.find({ brandName: lenovo })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/razer', function (req, res) {
    const razer = "Razer";

    gadget.find({ brandName: razer })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/msi', function (req, res) {
    const msi = "MSI";

    gadget.find({ brandName: msi })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/arous', function (req, res) {
    const aorus = "Arous";

    gadget.find({ brandName: aorus })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/apple', function (req, res) {
    const apple = "Apple";

    gadget.find({ brandName: Apple })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/laptop/microsoft', function (req, res) {
    const microsoft = "Microsoft";

    gadget.find({ brandName: microsoft })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
//price filter
router.get('/gadget/price/high', function (req, res) {

    gadget.find().sort({ gadgetprice: -1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/price/low', function (req, res) {

    gadget.find().sort({ gadgetprice: 1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/laptop/low', function (req, res) {

    gadget.find({ gadgettype: "Laptop" }).sort({ gadgetprice: 1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/laptop/high', function (req, res) {

    gadget.find({ gadgettype: "Laptop" }).sort({ gadgetprice: -1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/camera/low', function (req, res) {

    gadget.find({ gadgettype: "Camera" }).sort({ gadgetprice: 1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/camera/high', function (req, res) {

    gadget.find({ gadgettype: "Camera" }).sort({ gadgetprice: -1 })
        .then(function (gadget_price) {
            res.status(200).json({
                success: true,
                data: gadget_price
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/gadget/featured', function (req, res) {
    const gf = "Featured";

    gadget.find({ featured: gf })
        .then(function (p_featured) {
            res.status(200).json({
                success: true,
                data: p_featured
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

//camera filter
router.get('/camera/sony', function (req, res) {
    const sony = "Sony";

    gadget.find({ brandName: sony })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/camera/nikon', function (req, res) {
    const nikon = "Nikon";

    gadget.find({ brandName: nikon })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/camera/canon', function (req, res) {
    const canon = "Canon";

    gadget.find({ brandName: canon })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
            });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})
router.get('/camera/gopro', function (req, res) {
    const gopro = "GoPro";

    gadget.find({ brandName: gopro })
        .then(function (brand_name) {
            res.status(200).json({
                success: true,
                data: brand_name
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