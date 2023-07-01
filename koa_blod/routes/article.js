/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 10:22:41 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 10:22:41 
 */
const router = require("koa-router")();

const Article = require("../controller/article");

router.prefix("/api");

router.post("/article/list", Article.list);

router.post("/article/add", Article.add);

router.del("/article/delete/:id", Article.delete);

router.post("/article/edit", Article.updatearticle);

router.get("/article/all", Article.getall);

router.get("/article/detail/:id", Article.detail);

module.exports = router;