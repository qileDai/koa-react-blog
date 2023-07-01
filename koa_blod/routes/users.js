const router = require('koa-router')()

const UserController = require("../controller/users");

router.prefix("/api");

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })
router.get("/user/all", UserController.getall);
router.delete("/users/del/:id", UserController.deluser);
router.post('/user/login', UserController.login)
router.post("/user/add", UserController.adduser);
router.post("/user/list", UserController.userlist);
router.post("/user/editauthority", UserController.upadteuser);
router.post("/user/editperson", UserController.edituser);
module.exports = router
