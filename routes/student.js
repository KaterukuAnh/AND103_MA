var express = require("express");
var router = express.Router();

var studentModel = require("../models/studentModel");

const JWT = require('jsonwebtoken');
const config = require("../ultil/config");

//localhost:3000/student

// Lấy toàn bộ danh sách sinh viên
router.get("/all_student", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "Có lỗi khi xảy ra" + err});
        } else {
          //xử lý chức năng tương ứng với API
          var list = await studentModel.find({});
          res.status(200).json(list);
        }
      });
    } else {
    res.status(404).json({ status: false, message: "Không xác thực"});
    }
  } catch (error) {
    res.status(404).json({ status: false, message: "Có lỗi khi xảy ra" + error});
  }
});

// Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get("/all_student_boMon", async function (req, res) {
  try {
    const { bm } = req.query;
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "Có lỗi khi xảy ra" + err});
        } else {
          //xử lý chức năng tương ứng với API
          var list = await studentModel.find({ boMon: { $eq: bm } });
          res.status(200).json(list);
        }
      });
    } else {
    res.status(404).json({ status: false, message: "Không xác thực"});
    }
  } catch (error) {
    res.status(404).json({ status: false, message: "Có lỗi cảy ra " + error });
  }
});

// Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get("/get_diemTB/:minAvg/:maxAvg", async function (req, res) {
  try {
    const { minAvg, maxAvg } = req.params;

    const min = parseFloat(minAvg);
    const max = parseFloat(maxAvg);

    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "Có lỗi khi xảy ra" + err});
        } else {
          //xử lý chức năng tương ứng với API
          var list = await studentModel.find({ diemTB: { $gte: min, $lte: max } });
          res.status(200).json(list);
        }
      });
    } else {
    res.status(404).json({ status: false, message: "Không xác thực"});
    }
  } catch (error) {
    res.status(404).json({ status: false, message: "Có lỗi xảy ra " + error });
  }
});

// Tìm kiếm thông tin của sinh viên theo MSSV
router.get("/find_by_mssv", async function (req, res) {
  try {
    const { sv } = req.query;

    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "Có lỗi khi xảy ra" + err});
        } else {
          //xử lý chức năng tương ứng với API
          var student = await studentModel.find({ mssv: { $eq: sv } });
          res.status(200).json(student);
        }
      });
    } else {
    res.status(404).json({ status: false, message: "Không xác thực"});
    }
  } catch (error) {
    res.status(404).json({ status: false, message: "Có lỗi xảy ra " + error });
  }
});

// Thêm mới một sinh viên mới
router.post("/add_new_student", async function (req, res) {
  try {
    const { mssv, nameStudent, diemTB, boMon, tuoi } = req.body;

    const newItem = {
      mssv,
      nameStudent,
      diemTB,
      boMon,
      tuoi,
    };

    await studentModel.create(newItem);
    res.status(200).json({ status: true, message: "Đã thêm thành công" });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Đã có lỗi xảy ra" + error });
  }
});

// Thay đổi thông tin sinh viên theo MSSV
router.put("/edit_student_by_mssv", async function (req, res) {
  try {
    const { mssv, nameStudent, diemTB, boMon, tuoi } = req.body;

    var student = await studentModel.findOne({ mssv: { $eq: mssv } });
    if (student) {
      student.nameStudent = nameStudent ? nameStudent : student.nameStudent;
      student.diemTB = diemTB ? diemTB : student.diemTB;
      student.boMon = boMon ? boMon : student.boMon;
      student.tuoi = tuoi ? tuoi : student.tuoi;
      await student.save();
      res.status(200).json({ status: true, message: "Đã sửa thành công" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Đã có lỗi xảy ra" + error });
  }
});

// Xóa một sinh viên ra khỏi danh sách
router.delete("/delete_student/:mssv", async function (req, res) {
  try {
    const { mssv } = req.params;
    await studentModel.findOneAndDelete({
      mssv: { $eq: mssv },
    });
    res.status(200).json({ status: true, message: "Đã xoá thành công" });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Đã có lỗi xảy ra" + error });
  }
});

// Lấy danh sách các sinh viên thuộc BM CNTT và có DTB từ 9.0
router.get("/find_student_major_avg/:major/:avg", async function (req, res) {
  try {
    const { major, avg } = req.params;
    const average = parseFloat(avg);

    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "Có lỗi khi xảy ra" + err});
        } else {
          //xử lý chức năng tương ứng với API
          let list = await studentModel.find({
            boMon: { $eq: major },
            diemTB: { $gte: average },
          });
          res.status(200).json(list);
        }
      });
    } else {
    res.status(404).json({ status: false, message: "Không xác thực"});
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Đã có lỗi xảy ra" + error });
  }
});

// Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT có điểm trung bình từ 6.5
router.get(
  "/find_student/:minAge/:maxAge/:major/:avg",
  async function (req, res) {
    try {
      const { minAge, maxAge, major, avg } = req.params;

      const min = parseFloat(minAge);
      const max = parseFloat(maxAge);
      const average = parseFloat(avg);

      let list = await studentModel.find({
        tuoi: { $gte: min, $lte: max },
        boMon: { $eq: major },
        diemTB: { $gte: average },
      });
      res.status(200).json(list);
    } catch (error) {
      res
        .status(404)
        .json({ status: false, message: "Đã có lỗi xảy ra" + error });
    }
  }
);

// Sắp xếp danh sách sinh viên tăng dần theo dtb
router.get("/get_all_student_sort_by_svg", async function (req, res) {
  try {
    var list = await studentModel.find({}).sort({ diemTB: 1 });
    res.status(200).json(list);
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Đã có lỗi xảy ra" + error });
  }
});

// Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
router.get("/student_highest_avg/:boMon", async function (req, res) {
  try {
    const { boMon } = req.params;
    var listMajor = await studentModel
      .find({ boMon: { $eq: boMon } })
      .sort({ diemTB: -1 })
      .limit(1);
    var highestList = await studentModel.find({
      boMon: { $eq: boMon },
      diemTB: { $eq: listMajor[0].diemTB },
    });
    res.status(200).json(highestList);
  } catch (error) {
    res.status(404).json({ status: false, message: "Có lỗi xảy ra " + error });
  }
});

module.exports = router;