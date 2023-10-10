const fileRouter = require('express').Router()
const multer = require('multer')
const { isAuthUser } = require("../MIddleware/auth");
const FileController = require('../Controllers/fileUpload.controller')
const fs = require('fs')
let dir = './uploads';
let dirCsv = './uploads/csv';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
if (!fs.existsSync(dirCsv)) {
    fs.mkdirSync(dirCsv)
}
//image filter
let imageFilter = function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
        req.fileValidationError = "only image allowed"
        return callback(new Error("Image Error"), false)
    }
    callback(null, true)
}
//disk storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})
//disk storage
let csvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirCsv)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})


const uploader = multer({storage: storage})
const csvUploader = multer({storage: csvStorage})

/**
 * Only for user end
 */
fileRouter.post('/user/upload',  uploader.single('file'), FileController.uploadFile)

module.exports = fileRouter
