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
        enum: ['Laptop', 'Camera'],
        required: true
    },
    gadgetdescription: [String],

    featured: {
        type: String,
        enum: ['Featured', 'NotFeatured'],
        default: "NotFeatured"
    },

    gadgetImages: [
        {
            imageName: {
                type: String
            },

        }
    ],
    brandName: {
        type: String,
    },

laptop:{
    
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
        },

    },
    camera: {
        // Camera Details

        cameraType: {
            type: String
        },
        cameraModel: {
            type: String
        },
        cameraResolution: {
            type: String
        },
        cameraSalesPackage: {
            type: String
        },
        cameraDimensions: {
            type: String
        },
        cameraWeight: {
            type: String
        },
        cameraLensType: {
            type: String
        },
        cameraLensFocalLength: {
            type: String
        },
        cameraSensorType: {
            type: String
        },
        cameraSensorFormat: {
            type: String
        },
        cameraSensorSize: {
            type: String
        },
        cameraScreenSize: {
            type: String
        },
        cameraDisplayType: {
            type: String
        },
        cameraDisplayResolution: {
            type: String
        },
        cameraMemoryCardType: {
            type: String
        },
        cameraConnectivity: {
            type: String
        },
        // cameraConnectivity: {
        //     type: String
        // },
        cameraHDRSupport: {
            type: String
        },
        cameraImageFormats: {
            type: String
        },
        cameraSupportedAudioFormats: {
            type: String
        },
        cameraVideoResolution: {
            type: String
        },
        cameraVideoResolutionDetails: {
            type: String
        },
        cameraBatteryType: {
            type: String
        },
        cameraBatteryCapacity: {
            type: String
        },
        cameraNoOfShots: {
            type: String
        },
        cameraMicrophone: {
            type: String
        },
        cameraTripodSocket: {
            type: String
        },
        cameraHeadphoneJack: {
            type: String
        },
        cameraUSBConnectivity: {
            type: String
        },
        cameraPictBridgeSupport: {
            type: String
        }

    }


})

module.exports = Gadget;