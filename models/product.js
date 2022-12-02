const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Not more than 50 chars"]
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)