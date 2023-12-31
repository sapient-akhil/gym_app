const path = require('path');
const fs = require('fs');
const createError = require('http-errors');

// // THIS IS SUPERADMIN, ADMIN AND TRAINER PROFILE PHOTO UPLOAD AND UPDATE TIME OLD PHOTO DELETE FUNCTIO.

function uploadProfilePhoto(req, res, roleData) {

    if (req.files && req.files.profilePhoto) {
        let holderArray = [];
        if (roleData?.profilePhoto) {
            roleData.profilePhoto.forEach((imagePath) => {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting ${imagePath}:`, err);
                    } else {
                        console.log(`Deleted ${imagePath}`);
                    }
                });
            });
        }
        const files = Array.isArray(req.files.profilePhoto) ? req.files.profilePhoto : [req.files.profilePhoto];
        files.forEach(file => {
            const filePath = path.join(__dirname, "../uploads", `${Date.now() + '_' + file.name}`);

            if (!filePath) {
                throw createError.NotFound("Check the path when an image is uploaded.");
            }

            console.log("Generated filePath:", filePath);

            file.mv(filePath, err => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            holderArray.push(filePath);
        });
        return holderArray
    }
}

module.exports = uploadProfilePhoto;