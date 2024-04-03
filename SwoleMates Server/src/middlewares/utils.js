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
    fs.stat(path, function(err, stat){
        if (err == null) {
            fs.unlink(path)
        } else if (err.code === 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    })
}