const fs = require('fs-extra')

exports.moveImageFromTemp = async (tempPath, folderName, fileName) => { 
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    const picturePath = folderName + fileName
    await fs.move(tempPath,picturePath)
    return picturePath;
}

exports.deleteImage = async (path) => {
    fs.unlink(path)
}