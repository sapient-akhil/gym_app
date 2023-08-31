// const path = require('path');
// const fs = require('fs');
// const createError = require('http-errors');

// // THIS IS SUPERADMIN ,ADMIN AND TRAINER PROFILE PHOTO UPLOAD AND UPDATE TIME OLD PHOTO DELETE FUNCTIO.

// function uploadProfilePhoto(req, res, roleData, req_data) {
//     if (req.files && req.files.profilePhoto) {
//         const file = req.files.profilePhoto;
//         const filePath = path.join(__dirname, "../uploads", `${Date.now() + '_' + file.name}`);

//         if (!filePath) {
//             throw createError.NotFound("check the path when image is uploaded.");
//         }

//         console.log(filePath);

//         if (roleData) {
//             if (roleData.profilePhoto) {
//                 fs.unlink(roleData.profilePhoto, (err) => {
//                     if (err) {
//                         console.error('Error deleting previous image:', err);
//                     }
//                 });
//             }
//             roleData.profilePhoto = filePath;
//         }

//         file.mv(filePath, err => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//         });

//         const photo = { profilePhoto: filePath };
//         req_data.profilePhoto = photo.profilePhoto;
//     }
// }

const path = require('path');
const fs = require('fs');
const createError = require('http-errors');

function uploadProfilePhoto(req, res, roleData, req_data) {
    if (req.files && req.files.profilePhoto) {
        const files = Array.isArray(req.files.profilePhoto)
            ? req.files.profilePhoto
            : [req.files.profilePhoto];

        files.forEach(file => {
            const filePath = path.join(__dirname, "../uploads", `${Date.now()}_${file.name}`);

            if (!filePath) {
                throw createError.NotFound("Check the path when the image is uploaded.");
            }

            console.log(filePath);

            if (roleData) {
                if (roleData.profilePhoto) {
                    fs.unlink(roleData.profilePhoto, (err) => {
                        if (err) {
                            console.error('Error deleting previous image:', err);
                        }
                    });
                }
                roleData.profilePhoto = filePath;
            }

            file.mv(filePath, err => {
                if (err) {
                    console.error('Error uploading image:', err);
                }
            });

            const photo = { profilePhoto: filePath };
            req_data.profilePhoto = photo.profilePhoto;
        });
    }
}

// const path = require('path');
// const fs = require('fs').promises;
// const createError = require('http-errors');

// async function uploadProfilePhoto(req, res, roleData, req_data) {
//     if (req.files && req.files.profilePhoto) {
//         const files = Array.isArray(req.files.profilePhoto)
//             ? req.files.profilePhoto
//             : [req.files.profilePhoto];

//         for (const file of files) {
//             const filePath = path.join(__dirname, "../uploads", `${Date.now()}_${file.name}`);

//             if (!filePath) {
//                 throw createError.NotFound("Check the path when the image is uploaded.");
//             }

//             console.log(filePath);

//             if (roleData && roleData.profilePhoto) {
//                 try {
//                     await fs.unlink(roleData.profilePhoto);
//                     console.log('Previous image deleted successfully.');
//                 } catch (err) {
//                     console.error('Error deleting previous image:', err);
//                 }
//             }

//             roleData.profilePhoto = filePath;

//             try {
//                 await file.mv(filePath);
//                 console.log('Image uploaded successfully.');
//             } catch (err) {
//                 console.error('Error uploading image:', err);
//             }

//             req_data.profilePhoto = filePath;
//         }
//     }
// }

module.exports = uploadProfilePhoto;
