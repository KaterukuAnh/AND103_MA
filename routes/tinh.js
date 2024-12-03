var express = require("express");
var router = express.Router();

var tinhModel = require("../models/tinhModel");

module.exports = router;

// 1. Lấy danh sách tất cả các tỉnh
router.get('/alltinh', async (req, res) => {
    try {
        const list = await tinhModel.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ status: false, message: "Đã có lỗi xảy ra" + error });
    }
});

// 2. Lấy thông tin chi tiết một tỉnh theo ID
router.get('/:id', async (req, res) => {
    try {
        const list = await tinhModel.findById(req.params.id);
        if (!list) return res.status(404).json({ error: 'Tỉnh không tồn tại' });
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin tỉnh' });
    }
});

// 3. Tạo tỉnh mới
router.post('/new', async (req, res) => {
    try {
        const list = new tinhModel(req.body);
        await list.save();
        res.status(201).json(list);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi tạo tỉnh' });
    }
});

// 4. Cập nhật tỉnh theo ID
router.put('/:id', async (req, res) => {
    try {
        const list = await tinhModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!list) return res.status(404).json({ error: 'Tỉnh không tồn tại' });
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ error: 'Lỗi khi cập nhật tỉnh' });
    }
});

// 5. Xóa tỉnh theo ID
router.delete('/:id', async (req, res) => {
    try {
        const list = await tinhModel.findByIdAndDelete(req.params.id);
        if (!list) return res.status(404).json({ error: 'Tỉnh không tồn tại' });
        res.status(200).json({ message: 'Xóa tỉnh thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi xóa tỉnh' });
    }
});

// 6. Tìm tỉnh theo tên
router.get('/search/:name', async (req, res) => {
    try {
        const list = await tinhModel.find({ name: new RegExp(req.params.name, 'i') });
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi tìm tỉnh' });
    }
});

// 7. Lấy tổng số tỉnh
router.get('/count/total', async (req, res) => {
    try {
        const list = await tinhModel.countDocuments();
        res.status(200).json({ total: list });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi đếm số lượng tỉnh' });
    }
});

// 8. Lấy danh sách tỉnh với phân trang
router.get('/paginate', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const list = await tinhModel.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi phân trang' });
    }
});

// 9. Sắp xếp danh sách tỉnh theo tên
router.get('/sorted', async (req, res) => {
    try {
        const list = await tinhModel.find().sort({ name: 1 });
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi sắp xếp danh sách tỉnh' });
    }
});

// 10. Xóa tất cả các tỉnh
router.delete('/all', async (req, res) => {
    try {
        await tinhModel.deleteMany();
        res.status(200).json({ message: 'Xóa tất cả tỉnh thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi xóa tất cả tỉnh' });
    }
});
