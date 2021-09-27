const { ContextBuilder } = require('express-validator/src/context-builder');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './assets/image/cosmetic';
        // create folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const cosmeticUploads = multer({
    storage: storage
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './assets/image/cosmetic';
        // create folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const cosmeticUploads2 = multer({
    storage: storage2
});



module.exports = { cosmeticUploads, cosmeticUploads2 };