const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cate = new Schema({
    id: {type: ObjectId},
    name: {type: String}
});

module.exports = mongoose.models.cate || mongoose.model("cate",cate);
