const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto');
const path = require('path');
const REACT_APP_MONGO_URL_INSTAGRAM = process.env.REACT_APP_MONGO_URL_INSTAGRAM;

const storage = new GridFsStorage({
    url: REACT_APP_MONGO_URL_INSTAGRAM,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                };
                resolve(fileInfo);
            });
        });
    }
})

module.exports = multer({ storage }); 