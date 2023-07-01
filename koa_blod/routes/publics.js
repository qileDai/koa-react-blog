const router = require("koa-router")();
const koaBody = require("koa-body");
const path = require("path"); 
const PublicControler = require("../controller/public");

router.prefix("/api");
/* const uplod = {
  multipart: true,
  strict: false,
  formidable: {
    maxFileSize: 20 * 1024 * 1024, // 设置上传文件大小最大限制，默认20M
    uploadDir: path.join(__dirname, "public/upload/"), //设置文件上传的目录
    keepExtensions: true, // 保留文件扩展名
  },
}; */
router.post("/uplod/img",PublicControler.uplod);

module.exports = router;
