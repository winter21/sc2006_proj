const multer = require('multer')
const fs = require('fs-extra')
const public = 'public/'
const folderName = 'tempDir/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(public)) {
            fs.mkdirSync(public)
        }
        const publicFolder = public + folderName
        if (!fs.existsSync(publicFolder)) {
            fs.mkdirSync(publicFolder)
        }
        cb(null, publicFolder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

module.exports = multer({ storage: storage })