const express = require('express');
const router = express.Router();
const gadget = require('../models/gadget');
const gadgetUploads = require('../middleware/gadget');
const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');
// const fileupload = require('../middleware/fileupload.js');

router.post('/gadget/insert',
    gadgetUploads.single('gadgetimage'), function (req, res) {
        const errors = validationResult(req);
        console.log(errors.array())

        const gadgetname = req.body.gadgetname;
        const gadgetprice = req.body.gadgetprice;
        const gadgettype = req.body.gadgettype;
        const gadgetdescription = req.body.gadgetdescription;


        const gadget_data = new gadget({ gadgetname: gadgetname, gadgetprice: gadgetprice, gadgettype: gadgettype, gadgetdescription: gadgetdescription, gadgetimage: req.file.filename });
        gadget_data.save()
            .then(function (result) {
                res.status(201).json({ message: "Gadget Added" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            });
    })

router.get('/gadget/showall', function (req, res) {

    Gadget.find()
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

router.get('/gadget/one/:id', function (req, res) {
    const id = req.params.id;
    Gadget.find({ _id: id })
        .then(function (data) {
            res.status(200).json({ data: data });
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


module.exports = router;