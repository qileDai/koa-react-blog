const router = require("koa-router")();

const Tag = require("../controller/tags");

router.prefix("/api");


router.post("/taglist", Tag.taglist);

router.get("/tag/alllist", Tag.getAll);

router.post("/tag/add", Tag.addtag);

router.del("/tag/delete/:id", Tag.deletag);

router.post("/tag/edit", Tag.updatetag);
module.exports = router;
