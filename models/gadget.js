const mongoose = require('mongoose')
const Gadget = mongoose.model('gadget', {
    gadgetname: {
        type: String,
        required: true
    },
    gadgetprice: {
        type: String,
        required: true
    },
    gadgettype: {
        type: String,
        enum: ['Laptop', 'camera'],
        required: true
    },
    gadgetdescription: [String],

    gadgetimage: {
        type: String,
        // required: true
    },
    laptopBrand: {
        type: String
    },
    laptopModel: {
        type: String
    },
    laptopDimension: {
        type: String
    },
    laptopWeight: {
        type: String
    },
    laptopSize: {
        type: String
    },
    laptopResolution: {
        type: String
    },
    laptopProcessor: {
        type: String
    },
    laptopBaseClock: {
        type: String
    },
    laptopSpeed: {
        type: String
    },
    laptopRam: {
        type: String
    },
    laptopGraphic: {
        type: String
    },
    laptopDedicatedGraphicMemory: {
        type: String
    },
    laptopDedicatedGraphic: {
        type: String
    },
    laptopHarddisk: {
        type: String
    },
    laptopSSD: {
        type: String
    },
    laptopNoOfUSBPorts: {
        type: String
    },
    laptopUSBPorts: {
        type: String
    },
    laptopHDMIPorts: {
        type: String
    },
    laptopMultiCardSlot: {
        type: String
    },
    laptopHeadphone: {
        type: String
    },
    laptopJack: {
        type: String
    }




})

module.exports = Gadget;