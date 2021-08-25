const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './assets/image/userImg';

        // create folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const userImg = multer({
    storage: storage
});

module.exports = userImg;