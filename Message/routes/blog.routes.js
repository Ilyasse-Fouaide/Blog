const express = require("express");
const router = express.Router();
const blog = require("../controller/blog.controller");
const { upload } = require("../upload/file");

router.post('/blog/:id', upload.single("image"), blog.addblog);
router.get('/blogs', blog.blogs);
router.get('/myblog/:id', blog.myblog);
router.get('/mypost/:id', blog.mypost);
router.put('/edit/:id', upload.single("image"), blog.edit);
router.delete('/delete/:id', blog.delete);

module.exports = router;
