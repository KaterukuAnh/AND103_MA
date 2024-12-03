var express = require('express');
var router = express.Router();

var userModel = require("../models/userModel");

const JWT = require('jsonwebtoken');
const config = require("../ultil/config");

//http://localhost:3000/users
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//lấy localhost:3000/users/all
//lấy toàn bộ danh sách
router.get("/all", async function (req, res) {
  var list = await userModel.find({}, "fullname username");//lấy tất cả
  res.json(list);
});

//lab5
router.post("/login", async function (req, res) {
  try {
    const {username, password} = req.body;
    const checkUser = await userModel.findOne({username: username, password: password});
    if(checkUser == null){
      res.status(200).json({status: false, message:"username và mk k đúng"});
    }else{
      const token = JWT.sign({username: username},config.SECRETKEY,{expiresIn: '1h'});
      const refreshToken = JWT.sign({username: username},config.SECRETKEY,{expiresIn: '1d'});
      res.status(200).json({status: true, message:"Đăng nhập thành công", token: token, refreshToken: refreshToken});
    }
  } catch (error) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra " + error });
  }
});

router.get("/news", async function (req, res) {
  res.json({new: true});
});

module.exports = router;
