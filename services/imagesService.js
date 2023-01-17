const mongoose = require("mongoose");
require('fs');
let gfs;

const REACT_APP_MONGO_URL_INSTAGRAM = process.env.REACT_APP_MONGO_URL_INSTAGRAM;
const connection = mongoose.createConnection(REACT_APP_MONGO_URL_INSTAGRAM, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "photos"
    })
});

const getImageService = async (filename, res) => {
    return (
        await gfs.find({
            filename: filename
        }).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            gfs.openDownloadStreamByName(filename).pipe(res);
        })
    )
}

const deleteImageService = (fileId) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.fileId), (err, data) => {
        if (err) return res.status(404).json({ err: err.message });
        res.status(200).send();
    });
}

module.exports = { getImageService, deleteImageService }