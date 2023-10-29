const multer = require("multer");


/** configuracion de multer */
function uploadFile() {
    const storage = multer.diskStorage({
        destination: "./uploadsPostulacion",
        filename: function(_req, file, cb) {
            var extension = file.originalname.slice(file.originalname.lastIndexOf("."));
            cb(null, Date.now() + extension);
        },
    });

    const upload = multer({ storage: storage }).fields([
        { name: "file", maxCount: 10 },
    ]);

    return upload;
}

module.exports = uploadFile; 
