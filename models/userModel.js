const mongoose = require('mongoose');
const Schema = mongoose.Schema;//schema = collection
const ObjectId = Schema.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, // khóa chính
    username: {
        type: String // kiểu dữ liệu
        //required: true, // bắt buộc phải có
        //unique: true, // không được trùng
        //trim: true, // bỏ khoảng trắng 2 đầu
        //minlength: 3, // độ dài tối thiểu
        //maxlength: 50, // độ dài tối đa
        //default: 'No name' // giá trị mặc định
    },
    password:{type: String},
    fullname:{type: String}
});
module.exports = mongoose.models.user || mongoose.model('user', user);