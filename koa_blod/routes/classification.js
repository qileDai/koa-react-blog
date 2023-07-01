const router = require("koa-router")();

const classification = require("../controller/classification");

router.prefix("/api");

router.post("/classlist", classification.classlist);

router.get("/class/all", classification.getAll);

router.post("/class/add", classification.addclass);

router.del("/class/delete/:id", classification.deleteclass);

router.post("/class/edit", classification.updateclass);
module.exports = router;
