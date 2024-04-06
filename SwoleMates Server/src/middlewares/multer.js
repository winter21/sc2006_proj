const multer = require('multer')
const fs = require('fs-extra')
folderName = 'public/tempDir/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
        cb(null, folderName)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

module.exports = multer({ storage: storage })