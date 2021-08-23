const { ContextBuilder } = require('express-validator/src/context-builder');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './assets/image/review')
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
});

const reviewupload = multer({
    storage : storage
});


module.exports = reviewupload;