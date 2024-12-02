const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
    id_prodcut: {type: ObjectId},
    name_product: {type: String},
    price_product:{type: Number},
    quantity_product:{type: Number}
});

module.exports = mongoose.models.product || mongoose.model("product",product);