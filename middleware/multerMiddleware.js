const multer = require('multer')

//store the coming uploaded file in server - create storage space for that - create storage space in server
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads') /*where the file should be stored*/

    },
    filename: (req, file, callback) => {
        // Date.now() - retuen milliseconds from the  date class

        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename) /*name by which the file should be stored */
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error('Only png,jpg,jpeg files are accepted'))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig