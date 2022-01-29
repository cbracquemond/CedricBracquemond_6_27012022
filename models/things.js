const mongoose = require("mongoose")

const thingSchema = mongoose.Schema({
    name: {type: String, required: true},
    strenght: {type: Number, required: true},
    manufacturer: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl:{type: Number, required: true}
})

module.exports = mongoose.model("Thing", thingSchema)