/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 03:26:22 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 03:26:22 
 */
const router = require("koa-router")();

const Star = require("../controller/star");

router.prefix("/api");

router.post("/star/list", Star.starlist);

router.post("/star/add", Star.addstar);

router.del("/star/delete/:id", Star.delestar);

router.post("/star/edit", Star.updatestar);
module.exports = router;

