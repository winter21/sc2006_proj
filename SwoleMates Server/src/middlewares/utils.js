const fs = require('fs-extra')
const public = "public/"

exports.moveImageFromTemp = async (tempPath, folderName, fileName) => { 
    if (!fs.existsSync(public+folderName)) {
        fs.mkdirSync(public+folderName);
    }
    const picturePath = public+folderName + fileName
    await fs.move(tempPath,picturePath)
    return picturePath;
}

exports.deleteImage = async (path) => {
    fs.stat(path, function(err, stat){
        if (err == null) {
            fs.unlink(path)
        } else if (err.code === 'ENOENT') {
            console.log("File Error")
        } else {
            console.log('Some other error: ', err.code);
        }
    })
}