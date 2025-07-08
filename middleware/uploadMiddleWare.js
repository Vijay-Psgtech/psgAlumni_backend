const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = 'uploads/misc';

        const folderMap = {
            photo: 'uploads/alumni/profile',
        };

        for(const key in folderMap) {
            if(file.fieldname.startsWith(key)){
                folder = folderMap[key];
                break;
            }
        }

        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname);
        const base = file.fieldname + '-' + Date.now();
        cb(null, `${base}${ext}`);
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
});

module.exports = upload;