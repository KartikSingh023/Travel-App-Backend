const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PackageSchema = new Schema({
    package_name: { type: String, required: true },

    overveiw: { type: String, required: true },
    day1: { type: String, required: true },
    day2: { type: String, required: true },
    day3: { type: String, required: true },
    inclusion: [{
        type: String,
        required: true,
    }],
    exclusion: [{
        type: String,
        required: true,
    }],
    package_image: { type: String}, // this is a image url from cloudinary
})

module.exports = { Package: mongoose.model('package', PackageSchema) }
