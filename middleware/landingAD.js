const { ContextBuilder } = require('express-validator/src/context-builder');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './assets/image/landingAD')
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
});

const landingUploads = multer({
    storage : storage
});


module.exports = landingUploads;