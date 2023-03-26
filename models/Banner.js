const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    page: {
        type: String,
        required: true,
    },
    img_link: {
        type: String,
        default: "",
    },
});

module.exports = { Banner: mongoose.model('banner', BannerSchema) };
