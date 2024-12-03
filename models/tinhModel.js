const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tinh = new Schema({
    id: {type: ObjectId},
    ten_tinh: {type: String}
});

module.exports = mongoose.models.tinh || mongoose.model("tinh", tinh);