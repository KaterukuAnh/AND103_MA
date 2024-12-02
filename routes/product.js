var express = require('express');
var router = express.Router();

var productModel = require("../models/productModel");
var upload = require('../ultil/uploadConfig');
var sendMail = require('../routes/email');

module.exports = router;

//localhost:3000/prodcut/all
router.get("/all", async function (req, res) {
    var list = await productModel.find();
    res.json(list);   
});

//Lấy danh sách tất cả các sản phẩm có số lượng lớn hơn 20
router.get("/gt_product", async function (req, res) {
    var list = await productModel.find({quantity_product:{$gt:20}});
    res.json(list);
});

//Lấy danh sách sản phẩm có giá từ 20000 đến 50000
router.get("/price", async function (req, res) {
    var list = await productModel.find({price_product:{$gt:20000, $lt:50000}});
    res.json(list);
});

//Lấy danh sách sản phẩm có số lượng nhỏ hơn 10 hoặc giá lớn hơn 15000
router.get("/quantity", async function (req, res) {
    var list = await productModel.find({$or:[{quantity_product:{$lt:10}}, {price_product:{$gt:15000}}]});
    res.json(list);
});

//upload
//localhost:3000/products/upload
router.post('/upload', [upload.single('image')],
    async(req, res, next) => {
        try{
            const{ file } = req;
            if(!file){
                return res.json({status: 0, link: ""});
            }else{
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({status: 1, url: url});
            }
        }catch(error){
            console.log('Upload image erroe:', error);
            return res.json({status: 0, link: ""});
        }
});

//email
router.post("/send-mail", async function(req, res, next){
    try{
      const {to, subject, content} = req.body;
  
      const mailOptions = {
        from: "minhanhdag <minhanhdang511@gmail.com>",
        to: to,
        subject: subject,
        html: content
      };
      await sendMail.transporter.sendMail(mailOptions);
      res.json({ status: 1, message: "Gửi mail thành công"});
    }catch(err){
      res.json({ status: 0, message: "Gửi mail thất bại" + err});
    }
});

